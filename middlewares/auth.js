const SessionManager = require('../utils/sessionManager');
const Response = require('../utils/response');
const AdminService = require('../services/adminService');

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await SessionManager.decodeToken({ token });
    const { username } = payload;

    const result = await SessionManager.checkToken(username);
    if (result === 'null') {
      return Response.authenticationError(res, 'User not logged in');
    }

    const { userRole } = await AdminService.findAdmin(username);
    payload.userRole = userRole;
    req.user = payload;
    next();
  } catch (error) {
    return Response.authenticationError(res, 'Invalid or expired token');
  }
};

module.exports = verify;

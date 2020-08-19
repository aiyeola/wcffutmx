const AdminService = require('../services/adminService');
const Password = require('../utils/generatePassword');
const SessionManager = require('../utils/sessionManager');
const Response = require('../utils/response');

class AdminController {
  static async registerAdmin(req, res, next) {
    const { username, password, userRole = undefined } = req.body;
    try {
      const user = await AdminService.isAdmin(username);
      console.log('user: ', user);

      if (user.length) {
        return Response.conflictError(res, 'Username has been used');
      }

      const obj = new Password({ password });
      const hashedPassword = await obj.encryptPassword();
      const adminDetails = {
        username,
        password: hashedPassword,
        userRole
      };
      const data = await AdminService.createAdmin(adminDetails);
      // eslint-disable-next-line no-underscore-dangle
      delete data._doc.password;
      return Response.customResponse(res, 201, 'Admin Created', data);
    } catch (error) {
      next(error);
    }
  }

  static async loginAdmin(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await AdminService.findAdmin(username);
      if (!user) {
        return Response.notFoundError(res, 'Username does not exist');
      }

      const valid = await Password.checkPasswordMatch(password, user.password);
      if (!valid) return Response.validationError(res, 'Invalid password');

      user.userToken = await SessionManager.createSession(user, res);
      return Response.customResponse(res, 200, 'Admin Logged In', {
        userToken: user.userToken
      });
    } catch (error) {
      next(error);
    }
  }

  static async testRoute(req, res, next) {
    try {
      const admin = await AdminService.findAdmin('President');
      admin.data = {
        ...admin
      };
      return Response.customResponse(res, 200, 'Admin', admin.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;

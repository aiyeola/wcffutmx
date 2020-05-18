const Response = require('../utils/response');

class Access {
  static async isAdmin(req, res, next) {
    if (req.user.userRole !== 'Super Administrator') {
      return Response.authorizationError(
        res,
        "You don't have rights to complete this operation"
      );
    }
    next();
  }
}

module.exports = Access;

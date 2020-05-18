const Admin = require('../database/models/admin');

class AdminService {
  static async createAdmin(adminDetails) {
    try {
      const admin = new Admin(adminDetails);
      const newAdmin = await admin.save();
      return newAdmin;
    } catch (error) {
      throw error;
    }
  }

  static async findAdmin(param) {
    try {
      const user = await Admin.findOne({ username: param });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async isAdmin(param) {
    try {
      const user = await Admin.find({ username: param });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminService;

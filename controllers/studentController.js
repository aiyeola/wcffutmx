const AdminService = require('../services/adminService');
const StudentService = require('../services/studentService');
const Response = require('../utils/response');

class StudentController {
  static async studentData(req, res, next) {
    try {
      const { username } = req.user;
      await AdminService.findAdmin(username);
      const data = await StudentService.allStudentData();
      return Response.customResponse(res, 200, 'All Students Data', data);
    } catch (error) {
      next(error);
    }
  }

  static async aStudentData(req, res, next) {
    const { id } = req.params;
    try {
      const response = await StudentService.getStudentData(id);
      return Response.customResponse(res, 200, 'Student Details', response);
    } catch (error) {
      next(error);
    }
  }

  static async removeStudentData(req, res, next) {
    const { id } = req.params;
    try {
      await StudentService.removeStudent(id);
      return Response.customResponse(res, 200, 'Student record deleted');
    } catch (error) {
      next(error);
    }
  }

  // static async editStudentData(req, res, next) {
  //   const { id } = req.params;
  //   // const { id } = req.body;
  //   console.log(req.body);
  //   try {
  //     const data = await StudentService.editStudent(id, req.body);
  //     Response.customResponse(res, 200, 'Update Successful', data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = StudentController;

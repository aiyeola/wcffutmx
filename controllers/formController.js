const { normalize } = require('../utils/normalize');
const Response = require('../utils/response');
const StudentService = require('../services/studentService');

class FormController {
  static async insertData(req, res, next) {
    const {
      surname,
      firstName,
      department,
      schoolAddress,
      homeAddress
    } = req.body;

    const objNormalize = {
      surname,
      firstName,
      schoolAddress,
      homeAddress,
      department
    };
    const normalizedData = normalize(objNormalize);
    const studentDetails = { ...req.body, ...normalizedData };
    try {
      const data = await StudentService.insertRecord(studentDetails);
      Response.customResponse(
        res,
        201,
        'Student Record Inserted Successfully',
        data
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FormController;

const BioData = require('../database/models/bioForm');

class StudentService {
  static async allStudentData() {
    try {
      const data = await BioData.find({});
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async insertRecord(studentDetails) {
    try {
      const record = new BioData(studentDetails);
      const newRecord = await record.save();
      return newRecord;
    } catch (error) {
      throw error;
    }
  }

  static async getStudentData(id) {
    try {
      const data = await BioData.findById({ _id: id });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async removeStudent(id) {
    try {
      await BioData.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  // static async editStudent(id, update) {
  //   try {
  //     const data = await BioData.findByIdAndUpdate(id, update);
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

module.exports = StudentService;

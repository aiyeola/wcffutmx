const Joi = require('@hapi/joi');
const Schema = require('./schema');
const validator = require('../utils/validator');

class Validator {
  static validateFormData(req, res, next) {
    const schema = Joi.object().keys({
      surname: Schema.name,
      firstName: Schema.name,
      department: Schema.department,
      email: Schema.email,
      schoolAddress: Schema.text,
      homeAddress: Schema.text,
      level: Schema.level,
      contactNumber1: Schema.phone,
      contactNumber2: Schema.phone,
      unit: Schema.text,
      dobMM: Schema.birthMonth,
      dobYY: Schema.birthYear,
      origin: Schema.text,
      gender: Schema.gender,
      campus: Schema.campus
    });
    validator(schema, req.body, res, next);
  }

  static validateAdmin(req, res, next) {
    const schema = Joi.object().keys({
      username: Schema.username,
      password: Schema.password,
      userRole: Schema.userRole
    });
    validator(schema, req.body, res, next);
  }
}

module.exports = Validator;

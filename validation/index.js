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
      dobDD: Schema.number,
      dobMM: Schema.string,
      unit: Schema.text,
      origin: Schema.text,
      gender: Schema.gender,
      campus: Schema.campus
    });
    validator(schema, req.body, res, next);
  }

  static validateAdmin(req, res, next) {
    const schema = Joi.object().keys({
      username: Schema.username,
      password: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  static validateAdminDetails(req, res, next) {
    const schema = Joi.object().keys({
      username: Schema.username,
      password: Schema.password,
      newPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }
}

module.exports = Validator;

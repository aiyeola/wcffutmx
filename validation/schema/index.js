/* eslint-disable no-useless-escape */
const Joi = require('@hapi/joi');

module.exports = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true }
    })
    .trim()
    .required(),
  username: Joi.string().required(),
  userRole: Joi.string()
    .trim(),
    // .required()
    // .valid('Administrator', 'Super Administrator'),
  name: Joi.string().alphanum().min(3).max(30).required(),
  text: Joi.string().required(),
  level: Joi.number().required().valid(100, 200, 300, 400, 500),
  number: Joi.number().min(1).required(),
  nameOptional: Joi.string().alphanum().min(3).max(30).optional(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
    )
    .trim()
    .required()
    .min(1)
    .error(
      new Error(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)'
      )
    ),
  gender: Joi.string().valid('Male', 'Female').required(),
  department: Joi.string().trim().required(),
  phone: Joi.string()
    .regex(/^[0-9]{11}/)
    .optional()
    .error(
      new Error(
        'phone-number field needs to have a 11 chars and they must all be numbers'
      )
    ),
  string: Joi.string().trim().min(1),
  stringOptional: Joi.string().trim().min(1).optional(),
  campus: Joi.string().required().valid('Gidan-Kwano', 'Bosso')
};

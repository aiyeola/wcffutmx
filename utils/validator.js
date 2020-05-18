const Response = require('./response');
require('@hapi/joi');

module.exports = async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return Response.validationError(res, error.message);
  }
};

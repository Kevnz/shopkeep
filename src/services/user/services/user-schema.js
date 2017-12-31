const Joi = require('joi');

const schema = Joi.object().keys({
  identifier: Joi.string().uuid().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required('A valid email address is required')
});

module.exports = schema;

const Joi = require('joi');

const schema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email()
});

module.exports = schema;

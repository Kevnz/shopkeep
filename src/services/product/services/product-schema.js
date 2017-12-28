const Joi = require('joi');

const imageSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  urls: Joi.array().items(Joi.string().uri())
});

const productSchema = Joi.object().keys({
  identifier: Joi.string().uuid().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  images: Joi.array().items(Joi.object()),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string())
});

module.exports = productSchema;

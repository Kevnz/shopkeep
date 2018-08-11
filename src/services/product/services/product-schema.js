const Joi = require('joi');

const imageSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  thumbnail: Joi.string().uri(),
  main: Joi.string().uri()
});

const productSchema = Joi.object().keys({
  identifier: Joi.string().uuid().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  images: Joi.array().items(imageSchema),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string())
});

module.exports = productSchema;

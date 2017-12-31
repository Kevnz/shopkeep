const Joi = require('joi');
const assert = require('assert');
const schema = require('./product-schema');
const generators = require('../utils/generators');

describe('The Product Schema', () => {
  it('should validate a valid product', () => {
    const product = generators.generateProduct();
    const result = Joi.validate(product, schema);
    assert.ok(result.error === null, 'No error for valid product');
  });

  it('should not validate a product with no name', () => {
    const product = generators.generateProduct();
    product.name = '';
    const result = Joi.validate(product, schema);
    assert.ok(result.error !== null, 'Error for invalid product');
  });

  it('should not validate a product with an invalid image', () => {
    const product = generators.generateProduct();
    product.images[0] = Object.assign({}, product.images[0],
      {prop: 'bucket of fail' })
    ;
    const result = Joi.validate(product, schema);
    console.log('result of err', result.error.details[0].message)
    assert.ok(result.error.details[0].message === '"prop" is not allowed', 'No error for valid user');
  });
});

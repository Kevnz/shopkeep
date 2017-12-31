const assert = require('assert');
const faker = require('faker');
const uuid = require('uuid/v1');
const Joi = require('joi');

const userSchema = require('./user-schema');
const genUser = () => {
  return {
    identifier: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.exampleEmail()
  };
};
describe('The User Schema', () => {
  it('should validate a user with "identifier", "email", "firstName", "lastName"', () => {
    const validUser = genUser();
    const result = Joi.validate(validUser, userSchema);
    assert.ok(result.error === null, 'No error for valid user');
  });

  it('should not validate a user with no email', () => {
    const invalidUser = genUser();
    invalidUser.email = '';
    const result = Joi.validate(invalidUser, userSchema);
    assert.ok(result.error !== null, 'No error for valid user');
  });

  it('should not validate a user with an invalid email', () => {
    const invalidUser = genUser();
    invalidUser.email = 'bob';
    const result = Joi.validate(invalidUser, userSchema);
    assert.ok(result.error.details[0].message === '"email" must be a valid email', 'No error for valid user');
  });
});

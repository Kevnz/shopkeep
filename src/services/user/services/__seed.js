const faker = require('faker');
const db = require('./db');
const config = require('xtconf')();
const util = require('util');
const uuid = require('uuid/v1');

const genUser = () => {
  return {
    identifier: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.exampleEmail()
  };
};

console.log('SEED USERS NOW');
setTimeout(async () => {
  const fakeUsers = [];
  try {
    if (!db.users) {
      await db.createCollection('users');
    }
    const { users } = db;
    let count = 100;
    while (count > 0) {
      fakeUsers.push(users.insert(genUser()));
      count--;
    }
    await users.insert(fakeUsers);
    process.exit(0);
  } catch (err) {
    console.error('Seed Error', err);
    process.exit(0);
  }
}, 10000);

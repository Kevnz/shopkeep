const db = require('./db');
const faker = require('faker');
const mongoist = require('mongoist')
const config = require('xtconf')();
const util = require('util');
const fakeUsers = [];
const genUser = () => {
  const u = {

    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.exampleEmail()
  };
  console.log('u', u);
  fakeUsers.push(u);
  return u;
};


module.exports = {
    get: async (id) => {
      const users = db.users;
      const user = await users.findOne({id});
      return user;
    },
    getAll: async () => {
      const users = db.users;
      const allUsers = await users.find({}).toArray();
      return allUsers;
    },
    genAll: async () => {
      try {
        if (!db.users) {
          await db.createCollection('users');
        }
        const users = db.users;
        let count = 100;
        while (count > 0) {
          fakeUsers.push(users.insert(genUser()));
          count--;
        }
        await Promise.all(fakeUsers);
        return "all done";
      } catch(err) {
        console.error(err);
      }
    }
}

var winston = require('winston');
var qconf = require('qconf'),
    config = qconf();
  //
  // Requiring `winston-mongodb` will expose 
  // `winston.transports.MongoDB`
  //
//require('winston-mongodb').MongoDB;
/*
level: Level of messages that this transport should log, defaults to 'info'.
silent: Boolean flag indicating whether to suppress output, defaults to false.

db: The name of the database you want to log to. [required]

collection: The name of the collection you want to store log messages in, defaults to 'log'.
safe: Boolean indicating if you want eventual consistency on your log messages, if set to true it requires an extra round trip to the server to ensure the write was committed, defaults to true.
nativeParser: Boolean indicating if you want the driver to use native parser feature or not.
host: The host running MongoDB, defaults to localhost.
port: The port on the host that MongoDB is running on, defaults to MongoDB's default port.
username: The username to use when logging into MongoDB.
password: The password to use when logging into MongoDB. If you don't supply a username and password it will not use MongoDB authentication.
errorTimeout: Reconnect timeout upon connection error from Mongo, defaults to 10 seconds (10000).
timeout: Timeout for keeping idle connection to Mongo alive, defaults to 10 seconds (10000).
storeHost*/
/*
winston.add(winston.transports.MongoDB, {
    db:'shopkeep',
    host:config.get('db-connection'),
    port:'45107',
    user:config.get('db-user'),
    password:config.get('db-password')
});

*/
var logtastic = require('./db')('logtastic');
logger = {
    log: function(message) {
        console.log(message);
        logtastic.save({message: message, logged_on: new Date()});
    },
    logObject: function (obj, message) {
      console.log(obj);
      if (message) {
        logtastic.save({message: message, object: obj, logged_on: new Date()});
      } else {
        logtastic.save({object: obj, logged_on: new Date()});
      }
    }
};
module.exports = logger;
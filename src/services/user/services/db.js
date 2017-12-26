const config = require('xtconf')()
const mongoist = require('mongoist');
const db = mongoist(config.get('db'));

module.exports = db;

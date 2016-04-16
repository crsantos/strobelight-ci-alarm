'use strict';

const Bcrypt  = require('bcrypt');
const Basic   = require('hapi-auth-basic');
const User    = require('../models/user.js');

const users = {

  admin: {
    username: 'admin',
    password: '$2a$10$B/bV1O6ebwNvyWPYYMvs1.AM4F1mn0bq/TZFPtGkh/dOGdEiEJSwa',
    name: 'admin',
    id: '2133d32a'
    }
};

module.exports = function(request, username, password, callback) {

  const user = users[username];
  if (!user) {
    return callback(null, false);
  }

  /*
  var cryptedPassword = new User(username, password).encryptedPass();
  console.log("cryptedPassword => " + cryptedPassword);
  */
  
  Bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, { id: user.id, name: user.name });
  });
}

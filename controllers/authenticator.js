'use strict';

const Bcrypt    = require('bcrypt');
const Basic         = require('hapi-auth-basic');

const users = {

  admin: {
    username: 'admin',
    password: 'admin',
    name: 'admin',
    id: '2133d32a'
    }
};

module.exports = function(request, username, password, callback) {

  const user = users[username];
  if (!user) {

    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, (err, isValid) => {
    
    isValid = password === user.password;

    callback(err, isValid, { id: user.id, name: user.name });
  });
}

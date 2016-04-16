'use strict';

const Bcrypt  = require('bcrypt');
var Joi = require('joi');

module.exports = class User {

  constructor(username, password) {
    
    this.username = username;
    this.password = password;

    this.schema = {
      username: Joi.string().max(255),
      password: Joi.string().max(255)
    };
  }

  encryptedPass() {
    
    return Bcrypt.hashSync(this.password, 10);
  }
}
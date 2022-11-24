'use strict';

import { compare } from 'bcrypt';
import User from '../models/user.js';

const users = {

  admin: {
    username: 'admin',
    password: '$2a$10$B/bV1O6ebwNvyWPYYMvs1.AM4F1mn0bq/TZFPtGkh/dOGdEiEJSwa',
    name: 'admin',
    id: '2133d32a'
    }
};

export const validate = async (request, username, password) => {

  const user = users[username];
  if (!user) {
      return { credentials: null, isValid: false };
  }

   /*
  var cryptedPassword = new User(username, password).encryptedPass();
  console.log("cryptedPassword => " + cryptedPassword);
  */

  const isValid = await compare(password, user.password);
  const credentials = { id: user.id, name: user.name };

  return { isValid, credentials };
};
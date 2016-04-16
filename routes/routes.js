const handlers = require('../handlers/handlers.js');
var Joi = require('joi');

module.exports = [
{
  method : 'GET',
  path : '/',
  handler :  handlers.root,
  config : {
    auth: 'simple',
    description: 'root',
    notes: 'root path',
    tags : ['app']
  }
},
{
  method : 'GET',
  path : '/activate/{state}',
  handler : handlers.activate,
  config : {
    auth: 'simple',
    description: 'state either ON/OFF',
    notes: 'receives an ON or OFF',
    tags : ['app'],
    validate: {
      params: {
          state: Joi.any().valid('on', 'off'),
      }
    }
  }
},
{
  method : 'GET',
  path : '/toggle',
  handler : handlers.toggle,
  config : {
    auth: 'simple',
    description: 'state switcher',
    notes: 'toggles state',
    tags : ['app']
  }
}];
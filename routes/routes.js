const handlers = require('../handlers/handlers.js');

module.exports = [
{
  method : 'GET',
  path : '/',
  handler :  handlers.root,
  config : {
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
    description: 'state either ON/OFF',
    notes: 'receives an ON or OFF',
    tags : ['app']
  }
},
{
  method : 'GET',
  path : '/toggle',
  handler : handlers.toggle,
  config : {
    description: 'state switcher',
    notes: 'toggles state',
    tags : ['app']
  }
}];
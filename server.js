'use strict';

// REQUIRES
const constants     = require('./config/constants.js');
const authenticator = require('./controllers/authenticator.js');
const routes        = require('./routes/routes.js');
const basic         = require('hapi-auth-basic');
const Hapi          = require('hapi');
const Good          = require('good');

// SETUP
const server = new Hapi.Server();
server.connection({ port: constants.SERVER_PORT });

server.register(require('hapi-auth-basic'), (err) => {
     
  server.auth.strategy('simple', 'basic', { validateFunc: authenticator });
});

// ROUTES
server.route(routes);

// GOOD CONSOLE
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    // server.auth.strategy('simple', 'basic', { validateFunc: authenticator });

    server.start((err) => {

        if (err) {
           throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
'use strict';

// REQUIRES
const constants = require('./config/constants.js');
const routes = require('./routes/routes.js');
const Hapi = require('hapi');
const Good = require('good');

// SETUP
const server = new Hapi.Server();
server.connection({ port: constants.SERVER_PORT });

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

    server.start((err) => {

        if (err) {
           throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
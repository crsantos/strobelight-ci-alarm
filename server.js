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

// AUTH
server.register(require('hapi-auth-basic'), (err) => {
     
  server.auth.strategy('simple', 'basic', { validateFunc: authenticator });
});

// ROUTES
server.route(routes);

var options = {
    opsInterval: 60000,
    filter:{
        access_token: 'strobelight'
    },
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: '/tmp/strobelight.log'
    }]
};

// GOOD CONSOLE
server.register({
    register: Good,
    options: options
}, (err) => {

    if (err) {
        console.error(err);
    } else {
        server.start(() => {

            console.info('Server started at ' + server.info.uri);
        });
    }
});
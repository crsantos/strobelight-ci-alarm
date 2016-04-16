'use strict';

var GpioToggler = require('../controllers/gpiotoggler.js')

module.exports = Object.freeze({

    root : function (request, reply) {

        reply('Hello, world!');
    },

    activate : function (request, reply) {
        
        GpioToggler.toggle();
        reply('Toggling, ' + encodeURIComponent(request.params.state) + '!');
    }
});
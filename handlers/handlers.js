'use strict';

var GpioToggler = require('../controllers/gpiotoggler.js')
var gpiToggler = new GpioToggler();

module.exports = Object.freeze({

    root : function (request, reply) {

        reply('Hello, world!');
    },

    activate : function (request, reply) {
        
        var state = encodeURIComponent(request.params.state) === 'on'
        gpiToggler.toggle(state);
        reply('Activating: ' + state);
    },
    toggle : function (request, reply) {
        
        gpiToggler.toggle();
        reply('Toggling, ' + encodeURIComponent(request.params.state) + '!');
    },
});
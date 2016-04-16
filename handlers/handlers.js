'use strict';

var GpioToggler = require('../controllers/gpiotoggler.js')
var gpiToggler = new GpioToggler();

module.exports = Object.freeze({

    root : function (request, reply) {

        reply('Hello, world!');
    },

    activate : function (request, reply) {
        
        var state = encodeURIComponent(request.params.state) === 'on'
        if(state){

            gpiToggler.turnOn(function(err){
                console.log("turned on");
            });

        } else{

            gpiToggler.turnOff(function(err){
                console.log("turned off");
            });
        }
        
        reply('Activating: ' + state);
    },
    toggle : function (request, reply) {
        
        var toggledState = gpiToggler.toggle();
        reply('Toggling, ' + toggledState + '!');
    },
});
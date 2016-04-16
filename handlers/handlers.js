'use strict';

const constants = require('../config/constants.js');
var GpioToggler = require('../controllers/gpiotoggler.js')
var gpiToggler = new GpioToggler();

module.exports = Object.freeze({

    root : function (request, reply) {

        reply({
            status : "ok",
            timestamp : new Date().getTime(),
            version : constants.VERSION
        }).code(200);
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
        
        reply({
            status : state,
            timestamp : new Date().getTime(),
        }).code(200);
    },
    toggle : function (request, reply) {
        
        var toggledState = gpiToggler.toggle();
        reply({
            status : toggledState,
            timestamp : new Date().getTime(),
        }).code(200);
    },
});
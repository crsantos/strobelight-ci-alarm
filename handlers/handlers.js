'use strict';

const constants = require('../config/constants.js');
var GpioToggler = require('../controllers/gpiotoggler.js')
var Mathjs = require('mathjs');
var Omxplayer = require('node-omxplayer');
var Path = require('path');
var gpiToggler = new GpioToggler();
var player = new Omxplayer();

var randomSound = function () {
  var name = 'sound-' + Mathjs.randomInt(constants.AUDIO_MAX_RANDOM) + '.mp3';
  return Path.join(constants.AUDIO_BASE_PATH, name);
};

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
              try {
                player.newSource(randomSound(), 'local', true);
              } catch (err) {
                console.log("couldn't play audio file");
                console.log(err);
              } finally {
                console.log("turned on");
              }
            });

        } else{

            gpiToggler.turnOff(function(err){
              try {
                player.quit();
              } catch (err) {
                console.log("couldn't stop audio file");
                console.log(err);
              } finally {
                console.log("turned off");
              }
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

'use strict';

import { AUDIO_MAX_RANDOM, AUDIO_BASE_PATH, VERSION } from '../config/constants.js';
import { exec as Exec } from 'child_process';
import GpioToggler from '../controllers/gpiotoggler.js';
import { randomInt } from 'mathjs';
import Omxplayer from 'node-omxplayer';
import { join } from 'path';
var gpiToggler = new GpioToggler();
var player = new Omxplayer();

var randomSound = function () {
  var name = 'sound-' + randomInt(AUDIO_MAX_RANDOM) + '.mp3';
  return join(AUDIO_BASE_PATH, name);
};

var stopPlayer = function (player) {
  player.quit();
  // It's too bad that the previous call doesn't always terminate Omxplayer...
  Exec('killall -9 omxplayer.bin', function () {});
}

export default {
  
  root : async function (request, h) {
    
    const response = h.response(
      {
        status : "ok",
        timestamp : new Date().getTime(),
        version : VERSION
      }).code(200);
      response.type('application/json');
      
      return response;
    },
    
    activate : async function (request, h) {
      
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
            stopPlayer(player);
          } catch (err) {
            console.log("couldn't stop audio file");
            console.log(err);
          } finally {
            console.log("turned off");
          }
        });
        
      }
      
      const response = h.response({
        status : state,
        timestamp : new Date().getTime(),
      }).code(200);
      response.type('application/json');
      
      return response;
    },
    toggle : async function (request, h) {
      
      var toggledState = gpiToggler.toggle();
      
      const response = h.response(
        {
          status : toggledState,
          timestamp : new Date().getTime(),
        }).code(200);
        response.type('application/json');
        
        return response;
      },
    }

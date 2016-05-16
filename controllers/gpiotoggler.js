'use strict';

const constants = require('../config/constants.js');
const os = require('os');

module.exports = class GpioToggler {

    constructor() {
        
      console.info("Setting up GpioToggler")
      if(os.platform() != 'linux'){
        return;
      }
      var Gpio = require('onoff').Gpio;
      this.pin = new Gpio(constants.GPIO_PORT, 'out');
      var weakthis = this;
      this.turnOn(function(err){
          console.info("Initial on/off cycle...");
          weakthis.turnOff(function(err){
            console.info("Strobelight booted up!");
          }); // defaults to OFF at startup
      });
      
      process.on('SIGINT', this.exit);
    }

    toggle(){

      console.info("Toggling");
      if(os.platform() != 'linux'){
        return 1;
      }
      var previousState = this.pin.readSync();
      var newState = previousState ^ 1;
      this.pin.writeSync(newState);
      return (newState ? constants.WRITE_STATE.OFF : constants.WRITE_STATE.ON);
    }

    turnOn(callback){

      console.info("Turning on");
      if(os.platform() != 'linux'){
        return;
      }
      this.pin.write(constants.STATUS.ACTIVE, callback);
    }

    turnOff(callback){

      console.info("Turning off");
      if(os.platform() != 'linux'){
        return;
      }
      this.pin.write(constants.STATUS.INACTIVE, callback);
    }

    exit() {

      if(this.pin){
          this.pin.unexport();
      }
      process.exit();
    }

    toString() {
      return '(' + this.pin + ')';
    }
}

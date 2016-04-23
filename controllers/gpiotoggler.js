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
      turnOff(); // defaults to OFF
      process.on('SIGINT', this.exit);
    }

    toggle(){

      console.info("Toggling");
      var previousState = this.pin.readSync();
      var newState = previousState ^ 1;
      this.pin.writeSync(newState);
      return newState;
    }

    turnOn(callback){

      console.info("Turning on");
      this.pin.write(1, callback);
    }

    turnOff(callback){

      console.info("Turning off");
      this.pin.write(0, callback);
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

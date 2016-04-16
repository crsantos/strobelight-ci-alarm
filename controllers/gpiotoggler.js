'use strict';

const constants = require('../config/constants.js');
const os = require('os');

module.exports = class GpioToggler {

    constructor() {
        
      console.log("Setting up GpioToggler")
      if(os.platform() != 'linux'){
        return;
      }
      var Gpio = require('onoff').Gpio;
      this.pin = new Gpio(constants.GPIO_PORT, 'out');
      process.on('SIGINT', this.exit);
    }

    toggle(){

      console.log("Toggling");
      var previousState = this.pin.readSync();
      var newState = previousState ^ 1;
      this.pin.writeSync(newState);
      return newState;
    }

    turnOn(callback){

      this.pin.write(1, callback);
    }

    turnOff(callback){

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

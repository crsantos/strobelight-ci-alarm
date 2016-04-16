'use strict';

const constants = require('../config/constants.js');

module.exports = class GpioToggler {

    constructor() {
        
        console.log("Setting up GpioToggler")
        var Gpio = require('onoff').Gpio;
        this.pin = new Gpio(constants.GPIO_PORT, 'out');
        process.on('SIGINT', this.exit);
    }

    toggle(){

        console.log("Toggling");
        this.pin.writeSync(this.pin.readSync() ^ 1);
    }

    turnOn(){

        this.pin.writeSync(1);
    }

    turnOff(){

        this.pin.writeSync(0);
    }

    exit() {

      this.pin.unexport();
      process.exit();
    }

    toString() {
        return '(' + this.pin + ')';
    }
}

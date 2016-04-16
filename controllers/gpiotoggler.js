'use strict';

const constants = require('../config/constants.js');

module.exports = class GpioToggler {

    constructor() {
        
        console.log("Setting up GpioToggler")
        var Gpio = require('onoff').Gpio;
        this.led = new Gpio(constants.GPIO_PORT, 'out');
        process.on('SIGINT', this.exit);
    }

    toggle(){

        console.log("Toggling");
        this.led.writeSync(this.led.readSync() ^ 1);
    }

    turnOn(){

        this.led.writeSync(1);
    }

    turnOff(){

        this.led.writeSync(0);
    }

    exit() {

      this.led.unexport();
      process.exit();
    }

    toString() {
        return '(' + this.led + ')';
    }
}

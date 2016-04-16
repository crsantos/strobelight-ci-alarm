'use strict';

const constants = require('../config/constants.js');

module.exports = class GpioToggler {

    constructor() {
        
        console.log("Setting up GpioToggler")
        var Gpio = require('onoff').Gpio,
        led = new Gpio(constants.GPIO_PORT, 'out');
        process.on('SIGINT', exit);
    }

    toggle(){

        console.log("Toggling");
        led.writeSync(led.readSync() ^ 1);
    }

    turnOn(){

        led.writeSync(1);
    }

    turnOff(){

        led.writeSync(0);
    }

    exit() {

      led.unexport();
      process.exit();
    }

    toString() {
        return '(' + this.queue + ')';
    }
}
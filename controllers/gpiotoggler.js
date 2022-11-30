"use strict";

import { GPIO_PORT, WRITE_STATE, STATUS } from "../config/constants.js";
import { platform } from "os";

export default class GpioToggler {
  constructor() {
    console.info("Setting up GpioToggler");
    if (platform() != "linux") {
      return;
    }
    var Gpio = require("onoff").Gpio;
    this.pin = new Gpio(GPIO_PORT, "out");
    var weakthis = this;
    this.turnOn(function (err) {
      console.info("Initial on/off cycle...");
      weakthis.turnOff(function (err) {
        console.info("Strobelight booted up!");
      }); // defaults to OFF at startup
    });

    process.on("SIGINT", this.exit);
  }

  toggle() {
    console.info("Toggling");
    if (platform() != "linux") {
      return 1;
    }
    var previousState = this.pin.readSync();
    var newState = previousState ^ 1;
    this.pin.writeSync(newState);
    return newState ? WRITE_STATE.OFF : WRITE_STATE.ON;
  }

  turnOn(callback) {
    console.info("Turning on");
    if (platform() != "linux") {
      return;
    }
    this.pin.write(STATUS.ACTIVE, callback);
  }

  turnOff(callback) {
    console.info("Turning off");
    if (platform() != "linux") {
      return;
    }
    this.pin.write(STATUS.INACTIVE, callback);
  }

  exit() {
    if (this.pin) {
      this.pin.unexport();
    }
    process.exit();
  }

  toString() {
    return "(" + this.pin + ")";
  }
}

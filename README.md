strobelight-ci-alarm
====================

**strobelight-ci-alarm** is a Electronic Relay toggler to be used on our Continuous Integration system (while builds are running).

This project is intended to run on an [RaspberryPi](https://www.raspberrypi.org) and it's currently using [HapiJS](http://hapijs.com/) for creating a simple API and uses [OnOff](https://github.com/fivdi/onoff) library to access the GPIO ports of RPI.

It's currently using a real 220V strobelight, being turned ON via a relay and controlled via RPI, that handles API requests via _HapiJS_.

## API

### Authentication

This project uses basic authentication, relying on `hapi-auth-basic`. Basic passwords are hashed with `Bcrypt`.

If you need some extra _"protection"_, please refer to [hapijs.com/tutorials/auth](http://hapijs.com/tutorials/auth).

### Methods

#### `/toggle`

Toggles the relay switching its state

#### `/activate/{on|off}`

Changes the relay state switching either to `ON` or `OFF`

## Folder structure

This `hapi.js` project has the following structure:

```
|-config                # any config required - you can change your PIN ports here
|-controllers           # controllers for the application
|-handlers              # handlers for routes
|-models                # models required by the application
|-routes                # the routing system
|-system_configs        # here you can find any system configurations for deploying the solution
|---nginx               #   nginx sites config files
|-----sites-available
|---systemd             #   systemd config filex
|-----system
```

## Logging

Logging is performed via [good-console](https://github.com/hapijs/good-console) and redirected to `/tmp/strobelight.log` file.
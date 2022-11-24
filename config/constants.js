'use strict';

export const SERVER_PORT = 3000
export const GPIO_PORT = 17
export const VERSION = process.env.npm_package_version;
export const STATUS  = {
    ACTIVE    : 0,
    INACTIVE  : 1
}
export const WRITE_STATE  = {
    ON  : "on",
    OFF  : "off",
}
export const AUDIO_BASE_PATH = '/var/lib/strobelight-ci-alarm/sounds'
export const AUDIO_MAX_RANDOM = 10
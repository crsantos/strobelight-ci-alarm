module.exports = Object.freeze({
    
    SERVER_PORT: 3000,
    GPIO_PORT: 17,
    VERSION: 1,
    STATUS : {
    	ACTIVE   : 0,
    	INACTIVE : 1
    },
    WRITE_STATE : {
    	ON : "on",
    	OFF : "off",
    },
    AUDIO_BASE_PATH: '/var/lib/strobelight-ci-alarm/sounds',
    AUDIO_MAX_RANDOM: 10
});

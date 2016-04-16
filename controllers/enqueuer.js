'use strict';

module.exports = class Enqueuer {

    constructor() {
        // this.queue = ...;
    }

    toString() {
        return '(' + this.queue + ')';
    }

    enqueue(job){

    	console.log("enqueued: "+job);
    	// TODO
    }
}

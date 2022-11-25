'use strict';

import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

export const lab = Lab.script();

import * as dotenv from 'dotenv'
dotenv.config()

const defaultHeaders = {
    'Authorization': `Basic ${process.env.AUTH_KEY}`
}

const { afterEach, beforeEach, describe, it } = lab

import { init } from '../lib/server.js'

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/',
            headers: defaultHeaders
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('POST /toggle', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/toggle',
            headers: defaultHeaders
        });
        expect(res.statusCode).to.equal(200);
        let payload = JSON.parse(res.payload)
        expect(payload.status).to.equal(1);
    });
});
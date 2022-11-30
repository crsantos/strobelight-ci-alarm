"use strict";

import { SERVER_PORT } from "../config/constants.js";
import { validate } from "../controllers/authenticator.js";
import routes from "../routes/routes.js";

import Hapi from "@hapi/hapi";
import Basic from "@hapi/basic";
import hapipino from "hapi-pino";

const server = Hapi.server({
  port: SERVER_PORT,
  host: "localhost",
});

// Logging
await server.register({
  plugin: hapipino,
  options: {
    colorize: process.env.NODE_ENV !== "production",
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    // redact: ['req.headers.authorization']
  },
});

// Auth
await server.register(Basic);
server.auth.strategy("simple", "basic", { validate });

// Routes
server.route(routes);

console.log("Server running on %s", server.info.uri);

export const init = async () => {
  await server.initialize();
  return server;
};

export const start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

import handlers from "../handlers/handlers.js";
import Joi from "joi";

export default [
  {
    method: "GET",
    path: "/",
    handler: handlers.root,
    options: {
      auth: "simple",
      description: "root",
      notes: "root path",
      tags: ["app"],
    },
  },
  {
    method: "POST",
    path: "/activate/{state}",
    handler: handlers.activate,
    options: {
      auth: "simple",
      description: "state either ON/OFF",
      notes: "receives an ON or OFF",
      tags: ["app"],
      validate: {
        params: Joi.object({
          state: Joi.any().valid("on", "off"),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/toggle",
    handler: handlers.toggle,
    options: {
      auth: "simple",
      description: "state switcher",
      notes: "toggles state",
      tags: ["app"],
    },
  },
];

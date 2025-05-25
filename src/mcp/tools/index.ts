import * as projectTools from "./project/index.js";
import * as applicationTools from "./application/index.js";

export const allTools = [
  ...Object.values(projectTools),
  ...Object.values(applicationTools),
];

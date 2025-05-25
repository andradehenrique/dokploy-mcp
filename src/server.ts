import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { projectAll } from "./mcp/tools/projectAll.js";
import { projectOne } from "./mcp/tools/projectOne.js";
import { projectCreate } from "./mcp/tools/projectCreate.js";
import { projectUpdate } from "./mcp/tools/projectUpdate.js";
import { projectDuplicate } from "./mcp/tools/projectDuplicate.js";
import { projectRemove } from "./mcp/tools/projectRemove.js";

export function createServer() {
  const server = new McpServer({
    name: "dokploy",
    version: "1.0.0",
    capabilities: { tools: {}, resources: {}, prompts: {} },
  });

  const tools = [projectAll, projectOne, projectCreate, projectUpdate, projectDuplicate, projectRemove];

  for (const tool of tools) {
    server.tool(tool.name, tool.description, tool.schema.shape, tool.handler);
  }
  return server;
}

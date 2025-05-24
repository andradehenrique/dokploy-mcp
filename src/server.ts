import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { projectAll } from "./mcp/tools/projectAll.js";
import { projectOne } from "./mcp/tools/projectOne.js";

export function createServer() {
  const server = new McpServer({
    name: "dokploy",
    version: "1.0.0",
    capabilities: { tools: {}, resources: {}, prompts: {} },
  });

  const tools = [projectAll, projectOne];

  for (const tool of tools) {
    server.tool(tool.name, tool.description, tool.schema.shape, tool.handler);
  }
  return server;
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { allTools } from "./mcp/tools/index.js";

export function createServer() {
  const server = new McpServer({
    name: "dokploy",
    version: "1.0.0",
    capabilities: {
      tools: {
        listChanged: true
      }
    }
  })

  for (const tool of allTools) {
    server.tool(
      tool.name,
      tool.description,
      tool.schema.shape,
      tool.handler
    );
  }

  return server;
}

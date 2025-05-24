import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Dokploy CLI server running via stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

export const projectAll = defineTool({
  name: "project-all",
  description: "Lists all projects in Dokploy.",
  schema: z.object({}),
  handler: async () => {
    const httpClient = createHttpClient();
    const projects = await httpClient.get("/project.all");

    return {
      content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    };
  },
});

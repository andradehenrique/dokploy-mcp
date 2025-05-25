import { z } from "zod";
import { defineTool } from "../../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

export const projectCreate = defineTool({
  name: "project-create",
  description: "Creates a new project in Dokploy.",
  schema: z.object({
    name: z.string().min(1).describe("The name of the project."),
    description: z.string().nullable().optional().describe("An optional description for the project."),
    env: z.string().optional().describe("Optional environment variables for the project."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    await httpClient.post("/project.create", input);
    
    return {
      content: [{ type: "text", text: `Project "${input.name}" created successfully.` }],
    };
  },
});

import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

export const projectUpdate = defineTool({
  name: "project-update",
  description: "Updates an existing project in Dokploy.",
  schema: z.object({
    projectId: z.string().min(1).describe("The ID of the project to update."),
    name: z.string().min(1).optional().describe("The new name of the project."),
    description: z.string().nullable().optional().describe("The new description for the project."),
    createdAt: z.string().optional().describe("The creation date of the project."),
    organizationId: z.string().optional().describe("The organization ID of the project."),
    env: z.string().optional().describe("Environment variables for the project."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    await httpClient.post("/project.update", input);
    
    return {
      content: [{ type: "text", text: `Project "${input.projectId}" updated successfully.` }],
    };
  },
});

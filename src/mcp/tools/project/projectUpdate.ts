import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectUpdate = createTool({
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
    const response = await httpClient.post("/project.update", input);
    
    return ResponseFormatter.success(
      `Project "${input.projectId}" updated successfully`,
      response
    );
  },
});

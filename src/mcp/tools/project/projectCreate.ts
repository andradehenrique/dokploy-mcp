import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectCreate = createTool({
  name: "project-create",
  description: "Creates a new project in Dokploy.",
  schema: z.object({
    name: z.string().min(1).describe("The name of the project."),
    description: z.string().nullable().optional().describe("An optional description for the project."),
    env: z.string().optional().describe("Optional environment variables for the project."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const response = await httpClient.post("/project.create", input);
    
    return ResponseFormatter.success(
      `Project "${input.name}" created successfully`,
      response
    );
  },
});

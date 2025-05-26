import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const applicationCreate = createTool({
  name: "application-create",
  description: "Creates a new application in Dokploy.",
  schema: z.object({
    name: z.string().min(1).describe("The name of the application."),
    appName: z.string().optional().describe("The app name for the application."),
    description: z.string().nullable().optional().describe("An optional description for the application."),
    projectId: z.string().min(1).describe("The ID of the project where the application will be created."),
    serverId: z.string().nullable().optional().describe("The ID of the server where the application will be deployed."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const response = await httpClient.post("/application.create", input);
    
    return ResponseFormatter.success(
      `Application "${input.name}" created successfully in project "${input.projectId}"`,
      response
    );
  },
});

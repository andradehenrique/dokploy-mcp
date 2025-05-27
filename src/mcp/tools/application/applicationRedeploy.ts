import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationRedeploy = createTool({
  name: "application-redeploy",
  description: "Redeploys an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to redeploy."),
  }),
  annotations: {
    title: "Redeploy Application",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.redeploy", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" redeployment started successfully`,
      response.data
    );
  },
});

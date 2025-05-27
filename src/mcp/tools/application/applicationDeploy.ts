import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationDeploy = createTool({
  name: "application-deploy",
  description: "Deploys an application in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to deploy."),
  }),
  annotations: {
    title: "Deploy Application",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.deploy", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" deployment started successfully`,
      response.data
    );
  },
});

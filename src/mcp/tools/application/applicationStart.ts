import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationStart = createTool({
  name: "application-start",
  description: "Starts an application in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to start."),
  }),
  annotations: {
    title: "Start Application",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.start", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" started successfully`,
      response.data
    );
  },
});

import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationMarkRunning = createTool({
  name: "application-markRunning",
  description: "Marks an application as running in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to mark as running."),
  }),
  annotations: {
    title: "Mark Application as Running",
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.markRunning", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" marked as running successfully`,
      response.data
    );
  },
});

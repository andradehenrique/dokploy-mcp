import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationRefreshToken = createTool({
  name: "application-refreshToken",
  description: "Refreshes the token for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to refresh token for."),
  }),
  annotations: {
    title: "Refresh Application Token",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.refreshToken", input);

    return ResponseFormatter.success(
      `Token for application "${input.applicationId}" refreshed successfully`,
      response.data
    );
  },
});

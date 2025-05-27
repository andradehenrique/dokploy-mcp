import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationReadTraefikConfig = createTool({
  name: "application-readTraefikConfig",
  description: "Reads Traefik configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to get Traefik config for."),
  }),
  annotations: {
    title: "Read Application Traefik Config",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.get(
      `/application.readTraefikConfig?applicationId=${input.applicationId}`
    );

    if (!response?.data) {
      return ResponseFormatter.error(
        "Failed to fetch application Traefik configuration",
        `No Traefik configuration found for application "${input.applicationId}"`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched Traefik configuration for application "${input.applicationId}"`,
      response.data
    );
  },
});

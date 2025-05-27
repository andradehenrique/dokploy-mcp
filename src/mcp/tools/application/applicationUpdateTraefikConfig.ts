import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationUpdateTraefikConfig = createTool({
  name: "application-updateTraefikConfig",
  description: "Updates Traefik configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to update Traefik config for."),
    traefikConfig: z
      .string()
      .describe("The new Traefik configuration content."),
  }),
  annotations: {
    title: "Update Application Traefik Config",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.updateTraefikConfig",
      input
    );

    return ResponseFormatter.success(
      `Traefik configuration for application "${input.applicationId}" updated successfully`,
      response.data
    );
  },
});

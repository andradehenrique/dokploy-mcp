import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationSaveEnvironment = createTool({
  name: "application-saveEnvironment",
  description: "Saves environment variables for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to save environment for."),
    env: z
      .string()
      .nullable()
      .optional()
      .describe("Environment variables to save for the application."),
    buildArgs: z
      .string()
      .nullable()
      .optional()
      .describe("Build arguments for the application."),
  }),
  annotations: {
    title: "Save Application Environment",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.saveEnvironment",
      input
    );

    return ResponseFormatter.success(
      `Environment variables for application "${input.applicationId}" saved successfully`,
      response.data
    );
  },
});

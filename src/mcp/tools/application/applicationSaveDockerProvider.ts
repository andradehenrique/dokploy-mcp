import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationSaveDockerProvider = createTool({
  name: "application-saveDockerProvider",
  description:
    "Saves Docker provider configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to save Docker provider for."),
    dockerImage: z
      .string()
      .nullable()
      .optional()
      .describe("The Docker image to use for the application."),
    username: z
      .string()
      .nullable()
      .optional()
      .describe("Username for Docker registry authentication."),
    password: z
      .string()
      .nullable()
      .optional()
      .describe("Password for Docker registry authentication."),
    registryUrl: z
      .string()
      .nullable()
      .optional()
      .describe("The Docker registry URL."),
  }),
  annotations: {
    title: "Save Application Docker Provider",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.saveDockerProvider",
      input
    );

    return ResponseFormatter.success(
      `Docker provider for application "${input.applicationId}" saved successfully`,
      response.data
    );
  },
});

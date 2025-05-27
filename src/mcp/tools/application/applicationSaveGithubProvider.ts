import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationSaveGithubProvider = createTool({
  name: "application-saveGithubProvider",
  description:
    "Saves GitHub provider configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to save GitHub provider for."),
    repository: z
      .string()
      .nullable()
      .optional()
      .describe("The GitHub repository URL or name."),
    branch: z
      .string()
      .nullable()
      .optional()
      .describe("The branch to use from the repository."),
    owner: z.string().nullable().describe("The GitHub repository owner."),
    buildPath: z
      .string()
      .nullable()
      .optional()
      .describe("The path within the repository to build from."),
    githubId: z.string().nullable().describe("The GitHub integration ID."),
    watchPaths: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("Paths to watch for changes."),
    enableSubmodules: z.boolean().describe("Whether to enable git submodules."),
    triggerType: z
      .enum(["push", "tag"])
      .optional()
      .default("push")
      .describe("The trigger type for deployments."),
  }),
  annotations: {
    title: "Save Application GitHub Provider",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.saveGithubProvider",
      input
    );

    return ResponseFormatter.success(
      `GitHub provider for application "${input.applicationId}" saved successfully`,
      response.data
    );
  },
});

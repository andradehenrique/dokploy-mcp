import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationSaveGitlabProvider = createTool({
  name: "application-saveGitlabProvider",
  description:
    "Saves GitLab provider configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to save GitLab provider for."),
    gitlabBranch: z
      .string()
      .nullable()
      .describe("The branch to use from the repository."),
    gitlabBuildPath: z
      .string()
      .nullable()
      .describe("The path within the repository to build from."),
    gitlabOwner: z.string().nullable().describe("The GitLab repository owner."),
    gitlabRepository: z
      .string()
      .nullable()
      .describe("The GitLab repository URL or name."),
    gitlabId: z.string().nullable().describe("The GitLab integration ID."),
    gitlabProjectId: z.number().nullable().describe("The GitLab project ID."),
    gitlabPathNamespace: z
      .string()
      .nullable()
      .describe("The GitLab path namespace."),
    watchPaths: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("Paths to watch for changes."),
    enableSubmodules: z.boolean().describe("Whether to enable git submodules."),
  }),
  annotations: {
    title: "Save Application GitLab Provider",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.saveGitlabProvider",
      input
    );

    return ResponseFormatter.success(
      `GitLab provider for application "${input.applicationId}" saved successfully`,
      response.data
    );
  },
});

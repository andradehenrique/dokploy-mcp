import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationSaveBitbucketProvider = createTool({
  name: "application-saveBitbucketProvider",
  description:
    "Saves Bitbucket provider configuration for an application in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to save Bitbucket provider for."),
    bitbucketRepository: z
      .string()
      .nullable()
      .describe("The Bitbucket repository URL or name."),
    bitbucketOwner: z
      .string()
      .nullable()
      .describe("The Bitbucket repository owner."),
    bitbucketBranch: z
      .string()
      .nullable()
      .describe("The branch to use from the repository."),
    bitbucketBuildPath: z
      .string()
      .nullable()
      .describe("The path within the repository to build from."),
    bitbucketId: z
      .string()
      .nullable()
      .describe("The Bitbucket integration ID."),
    watchPaths: z
      .array(z.string())
      .nullable()
      .optional()
      .describe("Array of paths to watch for changes."),
    enableSubmodules: z.boolean().describe("Whether to enable submodules."),
  }),
  annotations: {
    title: "Save Application Bitbucket Provider",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post(
      "/application.saveBitbucketProvider",
      input
    );

    return ResponseFormatter.success(
      `Bitbucket provider for application "${input.applicationId}" saved successfully`,
      response.data
    );
  },
});

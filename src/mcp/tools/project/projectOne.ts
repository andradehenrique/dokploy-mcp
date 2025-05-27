import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectOne = createTool({
  name: "project-one",
  description: "Gets a specific project by its ID in Dokploy.",
  schema: z.object({
    projectId: z.string().describe("The ID of the project to retrieve."),
  }),
  annotations: {
    title: "Get Project Details",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const project = await apiClient.get(
      `/project.one?projectId=${input.projectId}`
    );

    if (!project?.data) {
      return ResponseFormatter.error(
        "Failed to fetch project",
        `Project with ID "${input.projectId}" not found`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched project "${input.projectId}"`,
      project.data
    );
  },
});

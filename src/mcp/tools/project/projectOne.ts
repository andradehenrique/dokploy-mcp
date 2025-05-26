import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectOne = createTool({
  name: "project-one",
  description: "Gets a specific project by its ID in Dokploy.",
  schema: z.object({
    projectId: z.string().describe("The ID of the project to retrieve."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const project = await httpClient.get("/project.one", { projectId: input.projectId });

    if (!project) {
      return ResponseFormatter.error(
        "Failed to fetch project",
        `Project with ID "${input.projectId}" not found`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched project "${input.projectId}"`,
      project
    );
  },
});

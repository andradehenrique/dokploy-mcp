import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectRemove = createTool({
  name: "project-remove",
  description: "Removes/deletes an existing project in Dokploy.",
  schema: z.object({
    projectId: z.string().min(1).describe("The ID of the project to remove."),
  }),
  annotations: {
    title: "Remove Project",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/project.remove", input);

    return ResponseFormatter.success(
      `Project "${input.projectId}" removed successfully`,
      response.data
    );
  },
});

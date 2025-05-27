import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectAll = createTool({
  name: "project-all",
  description: "Lists all projects in Dokploy.",
  schema: z.object({}),
  annotations: {
    title: "List All Projects",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async () => {
    const response = await apiClient.get("/project.all");

    if (!response?.data) {
      return ResponseFormatter.error(
        "Failed to fetch projects",
        "No response data received"
      );
    }

    return ResponseFormatter.success(
      "Successfully fetched all projects",
      response.data
    );
  },
});

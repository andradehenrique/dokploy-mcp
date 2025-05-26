import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectAll = createTool({
  name: "project-all",
  description: "Lists all projects in Dokploy.",
  schema: z.object({}),
  handler: async () => {
    const httpClient = createHttpClient();
    const response = await httpClient.get("/project.all");

    if (!response) {
      return ResponseFormatter.error(
        "Failed to fetch projects",
        "No response data received"
      );
    }

    return ResponseFormatter.success(
      "Successfully fetched all projects",
      response
    );
  },
});

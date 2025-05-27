import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationReadAppMonitoring = createTool({
  name: "application-readAppMonitoring",
  description: "Reads monitoring data for an application in Dokploy.",
  schema: z.object({
    appName: z
      .string()
      .describe("The app name of the application to get monitoring data for."),
  }),
  annotations: {
    title: "Read Application Monitoring",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.get(
      `/application.readAppMonitoring?appName=${input.appName}`
    );

    if (!response?.data) {
      return ResponseFormatter.error(
        "Failed to fetch application monitoring data",
        `No monitoring data found for application "${input.appName}"`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched monitoring data for application "${input.appName}"`,
      response.data
    );
  },
});

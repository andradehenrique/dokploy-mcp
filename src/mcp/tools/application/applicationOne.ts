import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const applicationOne = createTool({
  name: "application-one",
  description: "Gets a specific application by its ID in Dokploy.",
  schema: z.object({
    applicationId: z
      .string()
      .describe("The ID of the application to retrieve."),
  }),
  annotations: {
    title: "Get Application Details",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const application = await apiClient.get(
      `/application.one?applicationId=${input.applicationId}`
    );

    if (!application?.data) {
      return ResponseFormatter.error(
        "Failed to fetch application",
        `Application with ID "${input.applicationId}" not found`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched application "${input.applicationId}"`,
      application.data
    );
  },
});

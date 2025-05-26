import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const applicationOne = createTool({
  name: "application-one",
  description: "Gets a specific application by its ID in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to retrieve."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const application = await httpClient.get("/application.one", { applicationId: input.applicationId });

    if (!application) {
      return ResponseFormatter.error(
        "Failed to fetch application",
        `Application with ID "${input.applicationId}" not found`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched application "${input.applicationId}"`,
      application
    );
  },
});

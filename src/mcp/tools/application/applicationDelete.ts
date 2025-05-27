import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationDelete = createTool({
  name: "application-delete",
  description: "Deletes an application in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to delete."),
  }),
  annotations: {
    title: "Delete Application",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.delete", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" deleted successfully`,
      response.data
    );
  },
});

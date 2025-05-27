import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationStop = createTool({
  name: "application-stop",
  description: "Stops an application in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to stop."),
  }),
  annotations: {
    title: "Stop Application",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.stop", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" stopped successfully`,
      response.data
    );
  },
});

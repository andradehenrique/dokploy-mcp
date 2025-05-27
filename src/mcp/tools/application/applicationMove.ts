import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const applicationMove = createTool({
  name: "application-move",
  description: "Moves an application to a different project in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to move."),
    targetProjectId: z.string().describe("The ID of the destination project."),
  }),
  annotations: {
    title: "Move Application",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/application.move", input);

    return ResponseFormatter.success(
      `Application "${input.applicationId}" moved to project "${input.targetProjectId}" successfully`,
      response.data
    );
  },
});

import { z } from "zod";
import { createHttpClient } from "../../../utils/httpClient.js";
import { createTool } from "../toolFactory.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";

export const projectRemove = createTool({
  name: "project-remove",
  description: "Removes/deletes an existing project in Dokploy.",
  schema: z.object({
    projectId: z.string().min(1).describe("The ID of the project to remove."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const response = await httpClient.post("/project.remove", input);
    
    return ResponseFormatter.success(
      `Project "${input.projectId}" removed successfully`,
      response
    );
  },
});

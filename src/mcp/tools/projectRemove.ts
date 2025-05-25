import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { createHttpClient } from "../../utils/httpClient.js";

export const projectRemove = defineTool({
  name: "project-remove",
  description: "Removes/deletes an existing project in Dokploy.",
  schema: z.object({
    projectId: z.string().min(1).describe("The ID of the project to remove."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    await httpClient.post("/project.remove", input);
    
    return {
      content: [{ type: "text", text: `Project "${input.projectId}" removed successfully.` }],
    };
  },
});

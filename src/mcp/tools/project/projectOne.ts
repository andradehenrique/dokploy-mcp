import { z } from "zod";
import { defineTool } from "../../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

export const projectOne = defineTool({
  name: "project-one",
  description: "Gets a specific project by its ID in Dokploy.",
  schema: z.object({
    projectId: z.string().describe("The ID of the project to retrieve."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const project = await httpClient.get("/project.one", { projectId: input.projectId });

    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
    };
  },
});

import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { getClientConfig } from "../../utils/clientConfig.js";

export const projectOne = defineTool({
  name: "project-one",
  description: "Gets a specific project by its ID in Dokploy.",
  schema: z.object({
    projectId: z.string().describe("The ID of the project to retrieve."),
  }),
  handler: async (input) => {
    const { dokployUrl, authToken } = getClientConfig();

    const url = new URL(`${dokployUrl}/project.one`);
    url.searchParams.append("projectId", input.projectId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-api-key": authToken,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch project ${input.projectId}: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    const project = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
    };
  },
});

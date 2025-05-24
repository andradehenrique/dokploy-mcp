import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { getClientConfig } from "../../utils/clientConfig.js";

export const projectAll = defineTool({
  name: "project-all",
  description: "Lists all projects in Dokploy.",
  schema: z.object({}),
  handler: async () => {
    const { dokployUrl, authToken } = getClientConfig();

    const response = await fetch(`${dokployUrl}/project.all`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": authToken,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Failed to fetch projects: ${response.status} ${response.statusText} - ${errorBody}`
      );
    }

    const projects = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    };
  },
});

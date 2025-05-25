import { z } from "zod";
import { defineTool } from "../../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

export const applicationOne = defineTool({
  name: "application-one",
  description: "Gets a specific application by its ID in Dokploy.",
  schema: z.object({
    applicationId: z.string().describe("The ID of the application to retrieve."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    const application = await httpClient.get("/application.one", { applicationId: input.applicationId });

    return {
      content: [{ type: "text", text: JSON.stringify(application, null, 2) }],
    };
  },
});

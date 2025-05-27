import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresRemove = createTool({
  name: "postgres-remove",
  description: "Removes/deletes a PostgreSQL database from Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to remove."),
  }),
  annotations: {
    title: "Remove PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.remove", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" removed successfully`,
      response.data
    );
  },
});

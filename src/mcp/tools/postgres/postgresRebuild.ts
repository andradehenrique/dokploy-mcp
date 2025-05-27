import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresRebuild = createTool({
  name: "postgres-rebuild",
  description: "Rebuilds a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to rebuild."),
  }),
  annotations: {
    title: "Rebuild PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.rebuild", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" rebuild started successfully`,
      response.data
    );
  },
});

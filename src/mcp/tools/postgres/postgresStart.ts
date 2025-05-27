import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresStart = createTool({
  name: "postgres-start",
  description: "Starts a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to start."),
  }),
  annotations: {
    title: "Start PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.start", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" started successfully`,
      response.data
    );
  },
});

import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresOne = createTool({
  name: "postgres-one",
  description: "Gets a specific PostgreSQL database by its ID in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to retrieve."),
  }),
  annotations: {
    title: "Get PostgreSQL Database Details",
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (input) => {
    const postgres = await apiClient.get(
      `/postgres.one?postgresId=${input.postgresId}`
    );

    if (!postgres?.data) {
      return ResponseFormatter.error(
        "Failed to fetch PostgreSQL database",
        `PostgreSQL database with ID "${input.postgresId}" not found`
      );
    }

    return ResponseFormatter.success(
      `Successfully fetched PostgreSQL database "${input.postgresId}"`,
      postgres.data
    );
  },
});

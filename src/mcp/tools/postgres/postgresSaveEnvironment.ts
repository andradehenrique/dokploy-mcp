import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresSaveEnvironment = createTool({
  name: "postgres-saveEnvironment",
  description:
    "Saves environment variables for a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to save environment for."),
    env: z
      .string()
      .nullable()
      .optional()
      .describe("Environment variables to save for the PostgreSQL database."),
  }),
  annotations: {
    title: "Save PostgreSQL Environment",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.saveEnvironment", input);

    return ResponseFormatter.success(
      `Environment variables for PostgreSQL database "${input.postgresId}" saved successfully`,
      response.data
    );
  },
});

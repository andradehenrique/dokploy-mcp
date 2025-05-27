import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresReload = createTool({
  name: "postgres-reload",
  description: "Reloads a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to reload."),
    appName: z
      .string()
      .describe("The app name of the PostgreSQL database to reload."),
  }),
  annotations: {
    title: "Reload PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.reload", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" reloaded successfully`,
      response.data
    );
  },
});

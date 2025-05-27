import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresStop = createTool({
  name: "postgres-stop",
  description: "Stops a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to stop."),
  }),
  annotations: {
    title: "Stop PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.stop", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" stopped successfully`,
      response.data
    );
  },
});

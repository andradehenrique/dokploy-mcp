import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresMove = createTool({
  name: "postgres-move",
  description: "Moves a PostgreSQL database to a different project in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to move."),
    targetProjectId: z
      .string()
      .describe("The ID of the target project to move the database to."),
  }),
  annotations: {
    title: "Move PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.move", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" moved to project "${input.targetProjectId}" successfully`,
      response.data
    );
  },
});

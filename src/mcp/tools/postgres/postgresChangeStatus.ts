import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresChangeStatus = createTool({
  name: "postgres-changeStatus",
  description: "Changes the status of a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to change status for."),
    applicationStatus: z
      .enum(["idle", "running", "done", "error"])
      .describe("The new status for the PostgreSQL database."),
  }),
  annotations: {
    title: "Change PostgreSQL Database Status",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.changeStatus", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" status changed to "${input.applicationStatus}" successfully`,
      response.data
    );
  },
});

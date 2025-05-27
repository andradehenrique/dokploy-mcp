import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresDeploy = createTool({
  name: "postgres-deploy",
  description: "Deploys a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to deploy."),
  }),
  annotations: {
    title: "Deploy PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.deploy", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" deployment started successfully`,
      response.data
    );
  },
});

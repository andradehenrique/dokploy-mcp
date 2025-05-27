import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresSaveExternalPort = createTool({
  name: "postgres-saveExternalPort",
  description:
    "Saves external port configuration for a PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .describe("The ID of the PostgreSQL database to configure."),
    externalPort: z
      .number()
      .nullable()
      .describe("The external port number to expose the database on."),
  }),
  annotations: {
    title: "Save PostgreSQL External Port",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.saveExternalPort", input);

    return ResponseFormatter.success(
      `External port for PostgreSQL database "${input.postgresId}" saved successfully`,
      response.data
    );
  },
});

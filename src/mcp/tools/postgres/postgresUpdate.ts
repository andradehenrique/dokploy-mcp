import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

export const postgresUpdate = createTool({
  name: "postgres-update",
  description: "Updates an existing PostgreSQL database in Dokploy.",
  schema: z.object({
    postgresId: z
      .string()
      .min(1)
      .describe("The ID of the PostgreSQL database to update."),
    name: z
      .string()
      .min(1)
      .optional()
      .describe("The new name of the PostgreSQL database."),
    appName: z
      .string()
      .optional()
      .describe("The new app name of the PostgreSQL database."),
    databaseName: z
      .string()
      .min(1)
      .optional()
      .describe("The new database name."),
    databaseUser: z
      .string()
      .min(1)
      .optional()
      .describe("The new database username."),
    databasePassword: z
      .string()
      .optional()
      .describe("The new database password."),
    description: z
      .string()
      .nullable()
      .optional()
      .describe("The new description for the PostgreSQL database."),
    dockerImage: z
      .string()
      .optional()
      .describe("The new Docker image for PostgreSQL."),
    command: z
      .string()
      .nullable()
      .optional()
      .describe("Custom command to run the PostgreSQL database."),
    env: z
      .string()
      .nullable()
      .optional()
      .describe("Environment variables for the PostgreSQL database."),
    memoryReservation: z
      .string()
      .nullable()
      .optional()
      .describe("Memory reservation for the PostgreSQL database."),
    externalPort: z
      .number()
      .nullable()
      .optional()
      .describe("External port for the PostgreSQL database."),
    memoryLimit: z
      .string()
      .nullable()
      .optional()
      .describe("Memory limit for the PostgreSQL database."),
    cpuReservation: z
      .string()
      .nullable()
      .optional()
      .describe("CPU reservation for the PostgreSQL database."),
    cpuLimit: z
      .string()
      .nullable()
      .optional()
      .describe("CPU limit for the PostgreSQL database."),
    applicationStatus: z
      .enum(["idle", "running", "done", "error"])
      .optional()
      .describe("Application status."),
    createdAt: z.string().optional().describe("Creation date."),
    projectId: z.string().optional().describe("Project ID."),
  }),
  annotations: {
    title: "Update PostgreSQL Database",
    destructiveHint: true,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/postgres.update", input);

    return ResponseFormatter.success(
      `PostgreSQL database "${input.postgresId}" updated successfully`,
      response.data
    );
  },
});

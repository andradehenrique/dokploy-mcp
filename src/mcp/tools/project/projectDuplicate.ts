import { z } from "zod";
import apiClient from "../../../utils/apiClient.js";
import { ResponseFormatter } from "../../../utils/responseFormatter.js";
import { createTool } from "../toolFactory.js";

const serviceSchema = z.object({
  id: z.string().describe("The ID of the service."),
  type: z
    .enum([
      "application",
      "postgres",
      "mariadb",
      "mongo",
      "mysql",
      "redis",
      "compose",
    ])
    .describe("The type of the service."),
});

export const projectDuplicate = createTool({
  name: "project-duplicate",
  description:
    "Duplicates an existing project in Dokploy with optional service selection.",
  schema: z.object({
    sourceProjectId: z
      .string()
      .min(1)
      .describe("The ID of the source project to duplicate."),
    name: z
      .string()
      .min(1)
      .describe("The name for the new duplicated project."),
    description: z
      .string()
      .optional()
      .describe("An optional description for the duplicated project."),
    includeServices: z
      .boolean()
      .default(true)
      .describe(
        "Whether to include services in the duplication. Defaults to true."
      ),
    selectedServices: z
      .array(serviceSchema)
      .optional()
      .describe(
        "Array of specific services to include. When includeServices is true and this is not provided, you MUST first retrieve all services from the source project and include ALL of them in this array. Services are not automatically included - you must explicitly list each service with its ID and type."
      ),
  }),
  annotations: {
    title: "Duplicate Project",
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    const response = await apiClient.post("/project.duplicate", input);

    return ResponseFormatter.success(
      `Project "${input.name}" duplicated successfully from source project "${input.sourceProjectId}"`,
      response.data
    );
  },
});

import { z } from "zod";
import { defineTool } from "../toolTypes.js";
import { createHttpClient } from "../../../utils/httpClient.js";

const serviceSchema = z.object({
  id: z.string().describe("The ID of the service."),
  type: z.enum([
    "application",
    "postgres", 
    "mariadb",
    "mongo",
    "mysql",
    "redis",
    "compose"
  ]).describe("The type of the service."),
});

export const projectDuplicate = defineTool({
  name: "project-duplicate",
  description: "Duplicates an existing project in Dokploy with optional service selection.",
  schema: z.object({
    sourceProjectId: z.string().min(1).describe("The ID of the source project to duplicate."),
    name: z.string().min(1).describe("The name for the new duplicated project."),
    description: z.string().optional().describe("An optional description for the duplicated project."),
    includeServices: z.boolean().default(true).describe("Whether to include services in the duplication. Defaults to true."),
    selectedServices: z.array(serviceSchema).optional().describe("Array of specific services to include. If not provided, all services will be included when includeServices is true."),
  }),
  handler: async (input) => {
    const httpClient = createHttpClient();
    await httpClient.post("/project.duplicate", input);
    
    return {
      content: [{ type: "text", text: `Project "${input.name}" duplicated successfully from source project "${input.sourceProjectId}".` }],
    };
  },
});

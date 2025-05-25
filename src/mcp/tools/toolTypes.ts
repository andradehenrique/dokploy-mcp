import { z, ZodObject, ZodRawShape } from "zod";

// Defines the expected signature for a tool's handler function.
// T is the inferred type of the schema.
export type ToolHandler<T> = (input: T) => Promise<{ content: { type: "text"; text: string }[] }>;

// Defines the structure for a tool.
// TShape is the ZodRawShape (the object passed to z.object()).
export interface ToolDefinition<TShape extends ZodRawShape> {
  name: string;
  description: string;
  schema: ZodObject<TShape>; // The schema must be a ZodObject
  handler: ToolHandler<z.infer<ZodObject<TShape>>>; // Handler input is inferred from the ZodObject
}

/**
 * Helper function to define a tool with strong typing.
 * Ensures the provided definition conforms to ToolDefinition.
 */
export function defineTool<TShape extends ZodRawShape>(
  definition: ToolDefinition<TShape>
): ToolDefinition<TShape> {
  return definition;
}

import { z, ZodObject, ZodRawShape } from "zod";
import { createLogger } from "../../utils/logger.js";
import { createHttpClient } from "../../utils/httpClient.js";
import { ResponseFormatter } from "../../utils/responseFormatter.js";

export type ToolHandler<T> = (input: T) => Promise<{ content: { type: "text"; text: string }[] }>;

// Defines the structure for a tool.
// TShape is the ZodRawShape (the object passed to z.object()).
export interface ToolDefinition<TShape extends ZodRawShape> {
  name: string;
  description: string;
  schema: ZodObject<TShape>; // The schema must be a ZodObject
  handler: ToolHandler<z.infer<ZodObject<TShape>>>; // Handler input is inferred from the ZodObject
}

interface ToolContext {
    httpClient: ReturnType<typeof createHttpClient>;
    logger: ReturnType<typeof createLogger>;
}

const logger = createLogger('ToolFactory');

export function createToolContext(): ToolContext {
    return {
        httpClient: createHttpClient(),
        logger
    };
}

export function createTool<TShape extends import("zod").ZodRawShape>(
    definition: ToolDefinition<TShape>
): ToolDefinition<TShape> {
    return {
        ...definition,
        handler: async (input) => {
            const context = createToolContext();

            try {
                context.logger.info(`Executing tool: ${definition.name}`, { input });
                const result = await definition.handler(input);
                context.logger.info(`Tool executed successfully: ${definition.name}`);
                return result;
            } catch (error) {
                context.logger.error(`Tool execution failed: ${definition.name}`, {
                    error: error instanceof Error ? error.message : 'Unknown error',
                    input
                });

                return ResponseFormatter.error(
                    `Failed to execute tool: ${definition.name}`,
                    `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`
                );
            }
        }
    };
}
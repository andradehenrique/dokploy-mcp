export interface FormattedResponse {
  content: { type: "text"; text: string }[];
  isError?: boolean;
}

export class ResponseFormatter {
  static success(message: string, data?: unknown): FormattedResponse {
    const content: { type: "text"; text: string }[] = [];

    // First content: JSON data (if available) for LLM/integration consumption
    if (data) {
      content.push({
        type: "text",
        text: JSON.stringify(data, null, 2),
      });
    }

    // Second content: Human-friendly message
    const friendlyMessage = `✅ ${message}`;
    content.push({
      type: "text",
      text: friendlyMessage,
    });

    return {
      content,
    };
  }

  static error(message: string, details?: string): FormattedResponse {
    const content: { type: "text"; text: string }[] = [];

    // First content: Error details as JSON for LLM/integration consumption
    const errorData = {
      error: message,
      ...(details && { details }),
    };
    content.push({
      type: "text",
      text: JSON.stringify(errorData, null, 2),
    });

    // Second content: Human-friendly error message
    let friendlyMessage = `❌ **Error:** ${message}`;
    if (details) {
      friendlyMessage += `\n\n🔍 **Details:** ${details}`;
    }
    content.push({
      type: "text",
      text: friendlyMessage,
    });

    return {
      isError: true,
      content,
    };
  }
}

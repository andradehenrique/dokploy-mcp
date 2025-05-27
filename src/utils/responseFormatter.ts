export interface FormattedResponse {
  content: { type: "text"; text: string }[];
  isError?: boolean;
}

export class ResponseFormatter {
  static success(message: string, data?: unknown): FormattedResponse {
    let text = `✅ ${message}`;

    if (data) {
      text += `\n\n📊 **Data:**\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
    }

    return {
      content: [{ type: "text", text }],
    };
  }

  static error(message: string, details?: string): FormattedResponse {
    let text = `❌ **Error:** ${message}`;

    if (details) {
      text += `\n\n🔍 **Details:** ${details}`;
    }

    return {
      isError: true,
      content: [{ type: "text", text }],
    };
  }
}

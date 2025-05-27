import axios from "axios";
import { getClientConfig } from "./clientConfig.js";
import { createLogger } from "./logger.js";

// Create logger instance for axios client
const logger = createLogger("AxiosClient");

// Get configuration from existing client config
const config = getClientConfig();

// Default headers for MCP server context
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "x-api-key": config.authToken, // Use the same auth mechanism as httpClient
} as const;

// Create axios instance with configuration from clientConfig
const apiClient = axios.create({
  baseURL: config.dokployUrl,
  timeout: config.timeout,
  headers: DEFAULT_HEADERS,
});

// Request interceptor - Add request timing and logging
apiClient.interceptors.request.use(
  (config) => {
    // Add request timestamp for performance monitoring
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config as any).metadata = { startTime: Date.now() };

    logger.debug("Making API request", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      hasData: !!config.data,
    });

    return config;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    logger.error("Request interceptor error", { error: error.message });
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors with proper logging
apiClient.interceptors.response.use(
  (response) => {
    // Log response time for performance monitoring
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata = (response.config as any).metadata;
    const startTime = metadata?.startTime;

    if (startTime) {
      const duration = Date.now() - startTime;
      logger.info("API request completed", {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration: `${duration}ms`,
      });
    }

    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    const { response, request, config } = error;

    // Handle different error scenarios with proper logging
    if (response) {
      // Server responded with error status
      handleServerError(response);
    } else if (request) {
      // Request was made but no response received
      handleNetworkError(request, config);
    } else {
      // Something else happened
      handleUnknownError(error);
    }

    return Promise.reject(error);
  }
);

// Helper Functions

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleServerError(response: any): void {
  const { status, data, config } = response;

  const errorContext = {
    status,
    method: config?.method?.toUpperCase(),
    url: config?.url,
    message: data?.message || data?.error || "Unknown server error",
  };

  switch (status) {
    case 401:
      logger.error(
        "Authentication failed - Invalid or expired API key",
        errorContext
      );
      break;
    case 403:
      logger.error("Access forbidden - Insufficient permissions", errorContext);
      break;
    case 404:
      logger.error("Resource not found", errorContext);
      break;
    case 422:
      logger.error("Validation error", {
        ...errorContext,
        errors: data?.errors,
      });
      break;
    case 500:
      logger.error("Internal server error", errorContext);
      break;
    default:
      logger.error(`Server error (${status})`, errorContext);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleNetworkError(_request: any, config: any): void {
  logger.error("Network error - Request failed", {
    method: config?.method?.toUpperCase(),
    url: config?.url || "Unknown URL",
    timeout: config?.timeout || "No timeout set",
    error: "No response received from server",
  });
}

function handleUnknownError(error: Error): void {
  logger.error("Unknown error occurred", {
    error: error.message,
    stack: error.stack,
  });
}

// Utility function to update auth token (for MCP context)
export function setAuthToken(token: string): void {
  // Update default headers for future requests
  apiClient.defaults.headers.common["x-api-key"] = token;
  logger.info("Auth token updated for API client");
}

// Utility function to clear auth token
export function clearAuthToken(): void {
  // Remove authorization header
  delete apiClient.defaults.headers.common["x-api-key"];
  logger.info("Auth token cleared from API client");
}

// Export the configured axios instance
export default apiClient;

import { getClientConfig } from "./clientConfig.js";
import { createLogger } from "./logger.js";

interface HttpClientOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  searchParams?: Record<string, string>;
}

class DokployError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string,
    public method: string
  ) {
    super(message);
    this.name = 'DokployError';
  }
}

class HttpClient {
  private dokployUrl: string;
  private authToken: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;
  private logger = createLogger('HttpClient');

  constructor() {
    const config = getClientConfig();
    this.dokployUrl = config.dokployUrl;
    this.authToken = config.authToken;
    this.timeout = config.timeout;
    this.retryAttempts = config.retryAttempts;
    this.retryDelay = config.retryDelay;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async requestWithRetry(endpoint: string, options: HttpClientOptions, attempt = 1): Promise<Response> {
    try {
      return await this.request(endpoint, options);
    } catch (error) {
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        this.logger.warn(`Request failed, retrying (${attempt}/${this.retryAttempts})`, {
          endpoint,
          method: options.method,
          attempt,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        await this.sleep(this.retryDelay * Math.pow(2, attempt - 1)); // Exponential backoff
        return this.requestWithRetry(endpoint, options, attempt + 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof DokployError) {
      return error.statusCode >= 500 || error.statusCode === 429;
    }
    return true; // Network errors, etc.
  }

  private async request(endpoint: string, options: HttpClientOptions): Promise<Response> {
    const url = new URL(`${this.dokployUrl}${endpoint}`);
    
    if (options.searchParams) {
      Object.entries(options.searchParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const requestInit: RequestInit = {
      method: options.method,
      headers: {
        "accept": "application/json",
        "x-api-key": this.authToken,
      },
      signal: controller.signal,
    };

    if (options.body && (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')) {
      requestInit.headers = {
        ...requestInit.headers,
        "content-type": "application/json",
      };
      requestInit.body = JSON.stringify(options.body);
    }

    try {
      this.logger.debug(`Making ${options.method} request`, {
        endpoint,
        url: url.toString(),
        hasBody: !!options.body
      });

      const response = await fetch(url.toString(), requestInit);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new DokployError(
          `HTTP ${options.method} ${endpoint} failed: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`,
          response.status,
          endpoint,
          options.method
        );
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DokployError) {
        throw error;
      }
      throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async parseResponse<T>(response: Response): Promise<T | null> {
    const contentType = response.headers.get('content-type');
    
    if (!contentType?.includes('application/json')) {
      this.logger.warn("Response was not JSON", { 
        contentType,
        status: response.status 
      });
      return null;
    }

    try {
      return await response.json();
    } catch (error) {
      this.logger.warn("Failed to parse JSON response", { 
        error: error instanceof Error ? error.message : 'Unknown error',
        status: response.status 
      });
      return null;
    }
  }

  async get<T = unknown>(endpoint: string, searchParams?: Record<string, string>): Promise<T | null> {
    const response = await this.requestWithRetry(endpoint, { method: 'GET', searchParams });
    return this.parseResponse<T>(response);
  }

  async post<T = unknown>(endpoint: string, body?: unknown): Promise<T | null> {
    const response = await this.requestWithRetry(endpoint, { method: 'POST', body });
    return this.parseResponse<T>(response);
  }

  async put<T = unknown>(endpoint: string, body?: unknown): Promise<T | null> {
    const response = await this.requestWithRetry(endpoint, { method: 'PUT', body });
    return this.parseResponse<T>(response);
  }

  async delete<T = unknown>(endpoint: string, searchParams?: Record<string, string>): Promise<T | null> {
    const response = await this.requestWithRetry(endpoint, { method: 'DELETE', searchParams });
    return this.parseResponse<T>(response);
  }

  async patch<T = unknown>(endpoint: string, body?: unknown): Promise<T | null> {
    const response = await this.requestWithRetry(endpoint, { method: 'PATCH', body });
    return this.parseResponse<T>(response);
  }
}

let httpClientInstance: HttpClient | null = null;

export function createHttpClient(): HttpClient {
  if (!httpClientInstance) {
    httpClientInstance = new HttpClient();
  }
  return httpClientInstance;
}
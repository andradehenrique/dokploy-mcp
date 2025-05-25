import { getClientConfig } from "./clientConfig.js";

interface HttpClientOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  searchParams?: Record<string, string>;
}

class HttpClient {
  private dokployUrl: string;
  private authToken: string;

  constructor() {
    const config = getClientConfig();
    this.dokployUrl = config.dokployUrl;
    this.authToken = config.authToken;
  }

  private async request(endpoint: string, options: HttpClientOptions) {
    const url = new URL(`${this.dokployUrl}${endpoint}`);
    
    if (options.searchParams) {
      Object.entries(options.searchParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const requestInit: RequestInit = {
      method: options.method,
      headers: {
        "accept": "application/json",
        "x-api-key": this.authToken,
      },
    };

    if (options.body && (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH')) {
      requestInit.headers = {
        ...requestInit.headers,
        "content-type": "application/json",
      };
      requestInit.body = JSON.stringify(options.body);
    }

    const response = await fetch(url.toString(), requestInit);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP ${options.method} ${endpoint} failed: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`
      );
    }

    return response;
  }

  async get(endpoint: string, searchParams?: Record<string, string>) {
    const response = await this.request(endpoint, { method: 'GET', searchParams });
    return response.json();
  }

  async post(endpoint: string, body?: unknown) {
    const response = await this.request(endpoint, { method: 'POST', body });
    
    // Handle empty responses gracefully
    try {
      return await response.json();
    } catch (e) {
      console.warn("Response body was not valid JSON, but status was OK.");
      return {};
    }
  }

  async put(endpoint: string, body?: unknown) {
    const response = await this.request(endpoint, { method: 'PUT', body });
    
    try {
      return await response.json();
    } catch (e) {
      console.warn("Response body was not valid JSON, but status was OK.");
      return {};
    }
  }

  async delete(endpoint: string, searchParams?: Record<string, string>) {
    const response = await this.request(endpoint, { method: 'DELETE', searchParams });
    
    try {
      return await response.json();
    } catch (e) {
      console.warn("Response body was not valid JSON, but status was OK.");
      return {};
    }
  }

  async patch(endpoint: string, body?: unknown) {
    const response = await this.request(endpoint, { method: 'PATCH', body });
    
    try {
      return await response.json();
    } catch (e) {
      console.warn("Response body was not valid JSON, but status was OK.");
      return {};
    }
  }
}

export function createHttpClient() {
  return new HttpClient();
}

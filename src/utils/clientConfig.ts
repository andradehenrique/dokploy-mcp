interface Config {
  dokployUrl: string;
  authToken: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

class ConfigManager {
  private static instance: ConfigManager;
  private config: Config | null = null;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  getConfig(): Config {
    if (!this.config) {
      this.config = this.loadConfig();
    }
    return this.config;
  }

  private loadConfig(): Config {
    const dokployUrl = process.env.DOKPLOY_URL;
    const authToken = process.env.DOKPLOY_API_KEY;

    if (!dokployUrl) {
      throw new Error("Environment variable DOKPLOY_URL is not defined");
    }
    if (!authToken) {
      throw new Error("Environment variable DOKPLOY_API_KEY is not defined");
    }

    return {
      dokployUrl,
      authToken,
      timeout: parseInt(process.env.DOKPLOY_TIMEOUT || "30000", 10),
      retryAttempts: parseInt(process.env.DOKPLOY_RETRY_ATTEMPTS || "3", 10),
      retryDelay: parseInt(process.env.DOKPLOY_RETRY_DELAY || "1000", 10),
    };
  }
}

export function getClientConfig(): Config {
  return ConfigManager.getInstance().getConfig();
}

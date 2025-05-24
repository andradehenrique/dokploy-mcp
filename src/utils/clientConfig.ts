export function getClientConfig() {
  const dokployUrl = process.env.DOKPLOY_URL;
  const authToken = process.env.DOKPLOY_AUTH_TOKEN;

  if (!dokployUrl) {
    throw new Error("Environment variable DOKPLOY_URL is not defined. Please set it before running the application.");
  }
  if (!authToken) {
    throw new Error("Environment variable DOKPLOY_AUTH_TOKEN is not defined. Please set it before running the application.");
  }

  return { dokployUrl, authToken };
}

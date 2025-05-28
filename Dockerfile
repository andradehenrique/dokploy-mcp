# ----- Build Stage -----
FROM node:lts-alpine AS builder
WORKDIR /app

# Copy package and configuration
COPY package.json tsconfig.json ./

# Copy source code
COPY src ./src

# Install dependencies and build
RUN npm install && npm run build

# ----- Production Stage -----
FROM node:lts-alpine
WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/build ./build

# Copy package.json for production install
COPY package.json ./

# Install only production dependencies
RUN npm install --production --ignore-scripts

# Expose port for HTTP mode (optional, defaults to 3000)
EXPOSE 3000

# Add health check for HTTP mode
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD if [ "$MCP_TRANSPORT" = "http" ] || [ "$MCP_TRANSPORT" = "sse" ]; then \
        wget --no-verbose --tries=1 --spider http://localhost:${PORT:-3000}/health || exit 1; \
      else \
        exit 0; \
      fi

# Default command supports both stdio and HTTP modes
CMD ["node", "build/index.js"]

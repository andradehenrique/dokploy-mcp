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

# Expose no ports (stdio only)

# Default command
CMD ["node", "build/index.js"]
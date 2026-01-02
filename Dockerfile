FROM node:20-alpine

# Cache buster - force complete rebuild
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./
COPY server/package*.json ./server/

# Install ALL dependencies (including dev) for building
RUN npm ci
RUN cd server && npm ci

# Copy source code (dist/ is excluded via .dockerignore)
COPY . .

# Accept build arguments for environment variables
ARG VITE_API_BASE_URL
ARG BUILD_TIMESTAMP=unknown

# Set environment variables for build process
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV BUILD_TIMESTAMP=$BUILD_TIMESTAMP

# Generate Prisma client
RUN cd server && npx prisma generate

# Force complete clean rebuild - break all caches
RUN rm -rf dist/ node_modules/.cache/ .next/ build/ server/dist/
RUN npm run build
RUN cd server && npm run build

# Verify build succeeded
RUN ls -la dist/ && ls -la server/dist/

# Remove dev dependencies to reduce image size
RUN npm prune --omit=dev
RUN cd server && npm prune --omit=dev

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server/dist/index.js"]
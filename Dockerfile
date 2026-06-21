# ==========================================
# Stage 1: Build & Compilation
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy codebase
COPY . .

# Build frontend and backend bundles
RUN npm run build

# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled distribution from builder
COPY --from=builder /usr/src/app/dist ./dist

# Copy firebase client configuration if present
COPY --from=builder /usr/src/app/firebase-applet-config.json ./firebase-applet-config.json

# Use non-root node user for container security
USER node

# Expose server port
EXPOSE 3000

# Start production server
CMD ["node", "dist/server.cjs"]

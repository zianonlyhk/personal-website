# Author: Zian Huang 
# Date Created: 2025-04-30 
# ---------------------------------------- 

# Stage 1: Dependencies
FROM node:22-alpine AS deps

# Metadata labels
LABEL org.opencontainers.image.title="Personal Website of Zian Huang"
LABEL org.opencontainers.image.description="Contains a collection of the author's computing projects, study blog posts, and artworks"
LABEL org.opencontainers.image.vendor="Zian Huang"
LABEL org.opencontainers.image.authors="zianhuang00@gmail.com"
LABEL org.opencontainers.image.url="https://github.com/zianonlyhk/personal-website"
LABEL org.opencontainers.image.source="https://github.com/zianonlyhk/personal-website"
LABEL org.opencontainers.image.version="0.9.0"
LABEL org.opencontainers.image.licenses="MIT"
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set the correct environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]


# ---------------------------------------- 
# Copyright (c) 2025 Zian Huang. All rights reserved. 

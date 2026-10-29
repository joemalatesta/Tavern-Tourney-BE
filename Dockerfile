
# syntax = docker/dockerfile:1

FROM node:22-bookworm-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"

# Build stage
FROM base AS build

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    build-essential \
    python3 \
    pkg-config && \
    rm -rf /var/lib/apt/lists/*

COPY package-lock.json package.json ./
RUN npm ci

COPY . .

# Final runtime stage
FROM base

COPY --from=build /app /app

EXPOSE 3001

CMD ["npm", "run", "start"]

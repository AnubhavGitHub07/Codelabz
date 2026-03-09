# =============================================================================
# Codelabz — Production-ready Multi-Stage Dockerfile
# =============================================================================
# Stage 1 · deps       — install dependencies (cached layer)
# Stage 2 · builder    — build the Vite/React app
# Stage 3 · production — serve static files with nginx:alpine
# =============================================================================

# ── Stage 1: deps ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS deps

# Install OS-level build tools needed by some native npm packages
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the dependency manifests first so Docker can cache this layer
# independently of source-code changes.
COPY package.json package-lock.json ./

# Use `npm ci` for a clean, reproducible install based on the lockfile.
# --legacy-peer-deps is required by this project (see README FAQ).
RUN npm ci --legacy-peer-deps


# ── Stage 2: builder ──────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Re-use the installed node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source
COPY . .

# ── Firebase / Vite build-time environment variables ─────────────────────────
# Vite bakes VITE_* vars into the JS bundle at build time, so they must be
# declared as ARGs (and promoted to ENVs) before `npm run build` is called.
# Pass them with:  docker build --build-arg VITE_APP_FIREBASE_API_KEY=xxx ...
# or via the docker-compose.yml `args:` block.
ARG VITE_APP_FIREBASE_API_KEY
ARG VITE_APP_AUTH_DOMAIN
ARG VITE_APP_FIREBASE_PROJECT_ID
ARG VITE_APP_FIREBASE_STORAGE_BUCKET
ARG VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_APP_FIREBASE_APP_ID
ARG VITE_APP_FIREBASE_MEASUREMENTID
ARG VITE_APP_DATABASE_URL
ARG VITE_APP_FIREBASE_FCM_VAPID_KEY

ENV VITE_APP_FIREBASE_API_KEY=$VITE_APP_FIREBASE_API_KEY
ENV VITE_APP_AUTH_DOMAIN=$VITE_APP_AUTH_DOMAIN
ENV VITE_APP_FIREBASE_PROJECT_ID=$VITE_APP_FIREBASE_PROJECT_ID
ENV VITE_APP_FIREBASE_STORAGE_BUCKET=$VITE_APP_FIREBASE_STORAGE_BUCKET
ENV VITE_APP_FIREBASE_MESSAGING_SENDER_ID=$VITE_APP_FIREBASE_MESSAGING_SENDER_ID
ENV VITE_APP_FIREBASE_APP_ID=$VITE_APP_FIREBASE_APP_ID
ENV VITE_APP_FIREBASE_MEASUREMENTID=$VITE_APP_FIREBASE_MEASUREMENTID
ENV VITE_APP_DATABASE_URL=$VITE_APP_DATABASE_URL
ENV VITE_APP_FIREBASE_FCM_VAPID_KEY=$VITE_APP_FIREBASE_FCM_VAPID_KEY

# Build the production bundle (outputs to /app/dist)
RUN npm run build


# ── Stage 3: production ───────────────────────────────────────────────────────
FROM nginx:stable-alpine AS production

# Install curl for health checks & remove the default nginx welcome page
RUN apk add --no-cache curl && rm -rf /usr/share/nginx/html/*

# Copy our custom nginx config (handles SPA client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx listens on port 80 inside the container
EXPOSE 80

# Health-check: verify nginx is serving the app
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -sf http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

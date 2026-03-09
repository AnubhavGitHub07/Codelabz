# 🐳 Codelabz Docker Setup

This document covers how to run Codelabz using Docker for both **production** and **development** environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- A `.env` file with Firebase configuration (see [`.env.sample`](.env.sample))

## Quick Start

### Production

```bash
# 1. Copy and fill in your Firebase config
cp .env.sample .env
# Edit .env with your Firebase credentials

# 2. Build and run
docker compose up --build

# 3. Open the app
open http://localhost:8080
```

The production setup uses a **3-stage multi-stage build**:
1. **deps** — Installs node_modules (cached independently)
2. **builder** — Runs `npm run build` to produce the static bundle
3. **production** — Serves the bundle via `nginx:stable-alpine` (~100MB final image)

### Development

```bash
# 1. Ensure your .env file exists (see above)

# 2. Build and run with hot-reload + Firebase emulators
docker compose -f docker-compose.dev.yml up --build

# 3. Access the app and emulator UI
open http://localhost:5173      # Vite dev server
open http://localhost:4000      # Firebase Emulator UI
```

The development setup includes:
- **Hot-reload** via volume mounts (edit `src/`, see changes instantly)
- **Firebase Emulators** (Auth, Firestore, RTDB, Functions, Storage, Pub/Sub)
- All emulator ports exposed on the host

## Environment Variables

All `VITE_APP_*` variables are required for the app to connect to Firebase.
See [`.env.sample`](.env.sample) for the full list.

> **Security Note:** The `.env` file is excluded from the Docker image via `.dockerignore`.
> For production builds, env vars are passed as build-time ARGs (not baked into the image layers).

## Commands Reference

| Command | Description |
|---------|-------------|
| `docker compose up --build` | Build & run production |
| `docker compose up -d` | Run production (detached) |
| `docker compose down` | Stop & remove containers |
| `docker compose -f docker-compose.dev.yml up --build` | Build & run development |
| `docker compose -f docker-compose.dev.yml down` | Stop dev containers |
| `docker build -t codelabz .` | Build production image only |
| `docker run -p 8080:80 codelabz` | Run production image directly |

## Port Mappings

### Production
| Host Port | Container Port | Service |
|-----------|---------------|---------|
| 8080 | 80 | Nginx (app) |

### Development
| Host Port | Container Port | Service |
|-----------|---------------|---------|
| 5173 | 5173 | Vite dev server |
| 4000 | 4000 | Firebase Emulator UI |
| 9099 | 9099 | Auth emulator |
| 8080 | 8080 | Firestore emulator |
| 9000 | 9000 | RTDB emulator |
| 5001 | 5001 | Functions emulator |
| 8085 | 8085 | Pub/Sub emulator |
| 9199 | 9199 | Storage emulator |

## Troubleshooting

### Build fails at `npm ci`
```bash
# Clear Docker build cache and retry
docker builder prune
docker compose up --build --no-cache
```

### Port already in use
```bash
# Find and kill the process using the port (e.g., 8080)
lsof -i :8080
kill -9 <PID>
```

### Container shows "unhealthy"
```bash
# Check container logs
docker compose logs app

# Inspect health check status
docker inspect --format='{{json .State.Health}}' <container-id>
```

### Hot-reload not working (development)
- Ensure your source files are mounted correctly in `docker-compose.dev.yml`
- On macOS/Windows, Docker file-watching can be slow — save the file again or restart the container

### Firebase emulators not starting
- Ensure `VITE_APP_USE_EMULATOR=true` is set in your `.env`
- Check that Java (OpenJDK 17) installed correctly: `docker compose -f docker-compose.dev.yml exec app java -version`

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Dockerfile (Production)             │
│                                                      │
│  ┌──────────┐    ┌──────────┐    ┌────────────────┐ │
│  │  Stage 1  │    │  Stage 2  │    │    Stage 3     │ │
│  │   deps    │───▶│  builder  │───▶│  production    │ │
│  │ node:18   │    │ node:18   │    │ nginx:alpine   │ │
│  │ npm ci    │    │ npm build │    │ static files   │ │
│  └──────────┘    └──────────┘    └────────────────┘ │
│                                          │           │
│                                     Port 80 (HTTP)   │
└─────────────────────────────────────────────────────┘
```

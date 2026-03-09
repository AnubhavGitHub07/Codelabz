#!/bin/sh
set -e

echo "╔══════════════════════════════════════════════════╗"
echo "║       Codelabz Development Environment           ║"
echo "╚══════════════════════════════════════════════════╝"

# ── Start Firebase Emulators in the background ────────────────────────────────
if [ "$VITE_APP_USE_EMULATOR" = "true" ]; then
  echo "→ Starting Firebase Emulators..."

  # Inside Docker, emulators must bind to 0.0.0.0 (not 127.0.0.1)
  # so that ports are accessible from the host via Docker port mapping.
  if [ -f firebase.json ]; then
    echo "  Patching firebase.json hosts to 0.0.0.0 for Docker..."
    sed -i 's/"host": "127.0.0.1"/"host": "0.0.0.0"/g' firebase.json
    # Also patch the Emulator UI to bind to 0.0.0.0
    sed -i 's/"ui": {/"ui": {\n      "host": "0.0.0.0",\n      "port": 4000,/g' firebase.json
  fi

  # Build the emulator command
  EMU_CMD="firebase emulators:start --project demo-project"

  # Use --import only if testdata directory exists
  if [ -d "/app/testdata" ]; then
    echo "  Found testdata directory, importing seed data..."
    EMU_CMD="$EMU_CMD --import=testdata"
  else
    echo "  No testdata directory found, starting fresh emulators..."
  fi

  # Start emulators in the background
  $EMU_CMD &
  EMULATOR_PID=$!

  # Wait for Emulator UI to be ready (port 4000)
  echo "→ Waiting for emulators to be ready..."
  RETRIES=30
  until curl -sf http://localhost:4000 > /dev/null 2>&1 || [ "$RETRIES" -eq 0 ]; do
    RETRIES=$((RETRIES - 1))
    sleep 2
  done

  if [ "$RETRIES" -eq 0 ]; then
    echo "⚠  Emulators did not start in time. Continuing anyway..."
  else
    echo "✓  Firebase Emulators are ready!"
  fi
else
  echo "→ Skipping Firebase Emulators (VITE_APP_USE_EMULATOR != true)"
fi

# ── Start Vite dev server ─────────────────────────────────────────────────────
echo "→ Starting Vite dev server..."
exec npm run dev

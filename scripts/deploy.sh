#!/bin/bash
# Idempotent deployment script for Zappify
# Can be run multiple times safely - same result every time

set -e  # Exit on any error

echo "🚀 Starting Zappify deployment..."

# ── Idempotent directory creation ──────────────────────────────────
# Good: mkdir -p (won't fail if already exists)
# Bad:  mkdir (fails if already exists)
mkdir -p /tmp/zappify-deploy
mkdir -p /var/log/zappify

# ── Install dependencies (idempotent - npm install is safe to re-run) ──
echo "📦 Installing backend dependencies..."
cd backend && npm install --omit=dev && cd ..

echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# ── Build frontend (idempotent - overwrites existing build) ──
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..

# ── Restart backend service (idempotent) ──
echo "🔄 Restarting backend service..."
if command -v pm2 &> /dev/null; then
  # pm2 reload is idempotent - starts if not running, reloads if running
  pm2 reload zappify-backend 2>/dev/null || pm2 start backend/server.js --name zappify-backend
  pm2 save
else
  echo "⚠️  pm2 not found, skipping service restart"
fi

echo "✅ Deployment complete!"

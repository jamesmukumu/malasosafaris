#!/bin/bash
set -e

# Deployment script for Malasoafrica Safaris Client Nuxt application
# Usage: ./deploy.sh <image:tag> <deployment_path> [ENV_VAR=value ...]

IMAGE_TAG=$1
DEPLOYMENT_PATH=$2
shift 2
ENV_VARS=("$@")

if [ -z "$IMAGE_TAG" ] || [ -z "$DEPLOYMENT_PATH" ]; then
    echo "Usage: $0 <image:tag> <deployment_path> [ENV_VAR=value ...]"
    exit 1
fi

echo "🚀 Starting deployment of $IMAGE_TAG"

# Change to deployment directory
mkdir -p "$DEPLOYMENT_PATH"
cd "$DEPLOYMENT_PATH"

# Load Docker image
echo "📦 Loading Docker image..."
docker load < /tmp/malasoafricasafarisclient-deploy/malasoafricasafarisclient-image.tar.gz

# Stop and remove existing container if running
CONTAINER_NAME="malasoafricasafarisclient-app"
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop "$CONTAINER_NAME" || true
    docker rm "$CONTAINER_NAME" || true
fi

# Build environment file
ENV_FILE="$DEPLOYMENT_PATH/.env.docker"
> "$ENV_FILE"
for var in "${ENV_VARS[@]}"; do
    echo "$var" >> "$ENV_FILE"
done

# Run new container
echo "🐳 Starting new container..."
docker run -d \
    --name "$CONTAINER_NAME" \
    --restart unless-stopped \
    -p 3000:3000 \
    --env-file "$ENV_FILE" \
    --healthcheck-interval 30s \
    --healthcheck-timeout 3s \
    --healthcheck-retries 3 \
    --healthcheck-start-period 40s \
    "$IMAGE_TAG"

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
timeout 60 bash -c "
  while [ \$(docker inspect -f '{{.State.Health.Status}}' $CONTAINER_NAME) != 'healthy' ] && \
        [ \$(docker inspect -f '{{.State.Health.Status}}' $CONTAINER_NAME) != 'starting' ]; do
    sleep 2
  done
" || true

# Check if container is running
if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "✅ Deployment successful!"
    echo "📊 Container status:"
    docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "🔗 Application running at http://localhost:3000"
else
    echo "❌ Deployment failed - container is not running"
    echo "📋 Container logs:"
    docker logs "$CONTAINER_NAME" || true
    exit 1
fi

# Cleanup
echo "🧹 Cleaning up temporary files..."
rm -f /tmp/malasoafricasafarisclient-deploy/malasoafricasafarisclient-image.tar.gz

echo "✨ Deployment complete!"

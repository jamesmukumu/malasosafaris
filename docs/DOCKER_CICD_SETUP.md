# Docker & CI/CD Setup Documentation

This document provides instructions for the Docker containerization and CI/CD pipeline setup for the Royalty Nuxt 3 application.

## Overview

The setup includes:
- **Dockerfile**: Multi-stage Docker build for production-ready container
- **GitHub Actions CI Workflow**: Automated testing and building
- **GitHub Actions Deploy Workflow**: Automated deployment to custom VPS
- **Deployment Script**: Bash script to manage container lifecycle on VPS

## Files Created

### 1. `Dockerfile`
- **Purpose**: Containerize the Nuxt 3 application
- **Features**:
  - Multi-stage build (smaller final image)
  - node:20-alpine base (lightweight, secure)
  - Non-root user for security
  - Health checks
  - Proper signal handling with dumb-init

### 2. `.dockerignore`
- **Purpose**: Optimize Docker build context
- **Excludes**: node_modules, .git, .nuxt, .env files, etc.

### 3. `.github/workflows/ci.yml`
- **Purpose**: Run tests and build on every push/PR
- **Triggers**: Push to main/develop, Pull requests
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20.x
  3. Install dependencies (npm ci)
  4. Run linting (if available)
  5. Build the application
  6. Verify build output

### 4. `.github/workflows/deploy.yml`
- **Purpose**: Build and deploy Docker image to VPS
- **Trigger**: Push to main branch only
- **Steps**:
  1. Build Docker image
  2. Save image as tar.gz
  3. Upload to VPS via SCP
  4. Deploy via SSH (runs deploy.sh)

### 5. `scripts/deploy.sh`
- **Purpose**: Manage container lifecycle on VPS
- **Functions**:
  - Load Docker image
  - Stop/remove old container
  - Create environment file
  - Start new container with health checks
  - Verify container is running

## GitHub Secrets Configuration

Before the CI/CD pipeline can work, you need to configure the following secrets in GitHub:

### Database Configuration
- **`DB_HOST`**: Database hostname/IP
- **`DB_PORT`**: Database port (e.g., 5432, 3306)
- **`DB_USER`**: Database username
- **`DB_PASS`**: Database password
- **`DB_DATABASE`**: Database name

### Cloudinary Configuration
- **`CLOUDINARY_CLOUD_NAME`**: Your Cloudinary cloud name
- **`CLOUDINARY_API_KEY`**: Your Cloudinary API key
- **`CLOUDINARY_API_SECRET`**: Your Cloudinary API secret

### VPS Deployment Configuration
- **`VPS_HOST`**: VPS IP address or hostname
- **`VPS_USERNAME`**: SSH username for VPS
- **`VPS_SSH_KEY`**: Private SSH key (paste the full key with -----BEGIN/END lines)
- **`VPS_PORT`**: SSH port (usually 22)
- **`DEPLOYMENT_PATH`**: Path on VPS where app should run (e.g., /opt/royalty)

### How to Add Secrets
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter the secret name and value
5. Click **Add secret**

**Important**: For `VPS_SSH_KEY`, make sure to include the full private key including the BEGIN and END lines:
```
-----BEGIN RSA PRIVATE KEY-----
[your key content here]
-----END RSA PRIVATE KEY-----
```

## Local Testing

### Build Docker Image Locally
```bash
docker build -t royalty:latest .
```

### Run Container Locally
```bash
docker run -d \
  --name royalty-dev \
  -p 3000:3000 \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  -e DB_USER=your_user \
  -e DB_PASS=your_pass \
  -e DB_DATABASE=your_db \
  -e CLOUDINARY_CLOUD_NAME=your_cloud \
  -e CLOUDINARY_API_KEY=your_key \
  -e CLOUDINARY_API_SECRET=your_secret \
  royalty:latest
```

### View Container Logs
```bash
docker logs -f royalty-dev
```

### Stop Container
```bash
docker stop royalty-dev
docker rm royalty-dev
```

## Production Deployment

### On Your VPS

1. **Install Docker** (if not already installed):
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

2. **Create deployment directory**:
```bash
mkdir -p /opt/royalty
cd /opt/royalty
```

3. **Ensure SSH key authentication is set up** in the GitHub Actions secrets

4. **Test SSH access from GitHub Actions**:
   The deploy workflow will automatically test this

### First Deployment via GitHub

1. Push to `main` branch:
```bash
git add .
git commit -m "Add Docker and CI/CD setup"
git push origin main
```

2. Watch the deployment workflow:
   - Go to **Actions** tab in GitHub
   - Click on the **Deploy to VPS** workflow run
   - View real-time logs

## Workflow Execution

### CI Workflow (ci.yml)
- **When**: Every push to main/develop, every pull request
- **What**: Tests and builds the application
- **Status**: Check the Actions tab for results
- **Failure**: Check logs to see what failed

### Deploy Workflow (deploy.yml)
- **When**: Only on push to main branch (after CI passes)
- **What**: Builds Docker image and deploys to VPS
- **Status**: Check the Actions tab and SSH logs
- **Failure**: Check both GitHub Actions logs and VPS container logs

## Troubleshooting

### CI Workflow Fails
1. **Check logs** in GitHub Actions
2. **Common issues**:
   - Missing environment variables in secrets
   - Node.js version incompatibility
   - Build script missing in package.json

### Deploy Workflow Fails
1. **SSH Connection**:
   - Verify VPS_SSH_KEY is correct
   - Ensure VPS_HOST and VPS_USERNAME are correct
   - Check SSH port is open

2. **Docker Issues**:
   - Verify Docker is installed on VPS
   - Check disk space: `df -h`
   - View container logs: `docker logs royalty-app`

3. **Environment Variables**:
   - Verify all required secrets are set in GitHub
   - Check deploy.sh is executable

### Container Keeps Restarting
1. SSH into VPS
2. View logs:
   ```bash
   docker logs royalty-app
   ```
3. Check if port 3000 is in use:
   ```bash
   netstat -tuln | grep 3000
   ```

## Best Practices

1. **Never commit secrets** to the repository
2. **Use strong SSH keys** for VPS access
3. **Monitor container logs** after deployment
4. **Test locally first** before pushing to main
5. **Keep secrets updated** when they expire
6. **Review workflow logs** to catch issues early

## Additional Configuration

### Environment Variables in Nuxt Config
The application reads these from environment variables at runtime:
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_DATABASE`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

These are configured in `nuxt.config.ts` as runtime config and will be passed through the Docker container.

### Health Checks
The container includes a health check that pings the application every 30 seconds. The deployment script waits for the container to be healthy before considering deployment successful.

### Auto-restart Policy
The container is set with `--restart unless-stopped`, meaning it will automatically restart if it crashes, but won't restart if manually stopped.

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review this documentation
3. Check container logs on VPS: `docker logs royalty-app`
4. Verify all GitHub secrets are configured correctly

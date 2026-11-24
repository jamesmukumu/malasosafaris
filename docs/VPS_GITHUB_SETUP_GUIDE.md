# Malasoafrica Safaris Client - VPS & GitHub CI/CD Setup Guide

This guide walks you through setting up your VPS and GitHub repository for automated Docker deployment of the Malasoafrica Safaris Client application.

## Overview

The CI/CD pipeline automatically:
1. Builds a Docker image when you push to the `main` branch
2. Saves and compresses the Docker image
3. Transfers it to your VPS via SCP
4. Deploys the application using the deployment script
5. Starts the container with proper environment variables

---

## Part 1: VPS Setup

### Prerequisites
- Ubuntu/Debian-based VPS with SSH access
- Minimum 2GB RAM (4GB recommended)
- Minimum 20GB disk space
- Root or sudo privileges

### Step 1.1: Install Docker

```bash
# Update system packages
sudo apt update
sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional, allows running docker without sudo)
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker run hello-world
```

### Step 1.2: Create Deployment Directory

```bash
# Create deployment directory
sudo mkdir -p /opt/malasoafricasafarisclient
sudo chown $USER:$USER /opt/malasoafricasafarisclient

# Create temporary deployment staging directory
mkdir -p /tmp/malasoafricasafarisclient-deploy
```

### Step 1.3: Set Up SSH Key for GitHub

The GitHub Actions workflow will use SSH keys to connect to your VPS. This should already be configured, but verify:

```bash
# Verify SSH key permissions (should be 600 or 400)
ls -la ~/.ssh/id_rsa
# Output should show: -rw------- (600) or -r-------- (400)

# If you need to generate a new SSH key
ssh-keygen -t ed25519 -C "deployment@malasoafricasafarisclient"
# Save to: /home/username/.ssh/id_rsa
# Leave passphrase empty for automated deployments
```

### Step 1.4: Create a Non-Root User (Recommended)

```bash
# Create deployment user
sudo useradd -m -s /bin/bash malasoafricasafarisclient

# Add to docker group
sudo usermod -aG docker malasoafricasafarisclient

# Switch to this user for deployments
sudo su - malasoafricasafarisclient
```

### Step 1.5: Verify VPS Information

You'll need this information for GitHub secrets:
```bash
# Get VPS hostname/IP
hostname -I

# Get SSH port (default is 22)
grep Port /etc/ssh/sshd_config | grep -v "^#"

# Verify Docker is accessible
docker ps
```

---

## Part 2: GitHub Repository Setup

### Step 2.1: Add SSH Private Key to GitHub

1. Go to your repository: **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Create the following secrets:

#### Required Secrets:

**1. VPS_HOST**
- **Name**: `VPS_HOST`
- **Value**: Your VPS IP address or hostname (e.g., `192.168.1.100` or `myvps.example.com`)

**2. VPS_USERNAME**
- **Name**: `VPS_USERNAME`
- **Value**: SSH username (e.g., `root`, `ubuntu`, or your custom user like `malasoafricasafarisclient`)

**3. VPS_SSH_KEY**
- **Name**: `VPS_SSH_KEY`
- **Value**: Contents of your private SSH key (the entire key file)
  ```bash
  cat ~/.ssh/id_rsa
  ```
  Copy the entire output including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`

**4. VPS_PORT**
- **Name**: `VPS_PORT`
- **Value**: SSH port number (default is `22`)

**5. DEPLOYMENT_PATH**
- **Name**: `DEPLOYMENT_PATH`
- **Value**: Path on VPS where application runs (e.g., `/opt/malasoafricasafarisclient` or `/home/malasoafricasafarisclient/app`)

#### Database Secrets (if using external database):

**6. DB_HOST**
- **Name**: `DB_HOST`
- **Value**: Database hostname or IP address

**7. DB_PORT**
- **Name**: `DB_PORT`
- **Value**: Database port (e.g., `3306` for MySQL, `5432` for PostgreSQL)

**8. DB_USER**
- **Name**: `DB_USER`
- **Value**: Database username

**9. DB_PASS**
- **Name**: `DB_PASS`
- **Value**: Database password

**10. DB_DATABASE**
- **Name**: `DB_DATABASE`
- **Value**: Database name

#### Cloudinary Secrets (if using image storage):

**11. CLOUDINARY_CLOUD_NAME**
- **Name**: `CLOUDINARY_CLOUD_NAME`
- **Value**: Your Cloudinary cloud name

**12. CLOUDINARY_API_KEY**
- **Name**: `CLOUDINARY_API_KEY`
- **Value**: Your Cloudinary API key

**13. CLOUDINARY_API_SECRET**
- **Name**: `CLOUDINARY_API_SECRET`
- **Value**: Your Cloudinary API secret

### Step 2.2: Verify Secrets Are Added

Go to **Settings → Secrets and variables → Actions** and verify all secrets appear in the list (values are masked).

---

## Part 3: Testing the Pipeline

### Step 3.1: Trigger a Deployment

1. Make a small change to your repository (e.g., update README.md)
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```

3. Go to **Actions** tab in your GitHub repository
4. Watch the workflow execute in real-time

### Step 3.2: Monitor the Deployment

```bash
# On your VPS, watch the Docker container status
watch -n 2 'docker ps | grep malasoafricasafarisclient'

# Check container logs
docker logs malasoafricasafarisclient-app

# Check container health
docker inspect --format='{{.State.Health.Status}}' malasoafricasafarisclient-app
```

### Step 3.3: Verify Application is Running

```bash
# Check if application is accessible locally
curl http://localhost:3000

# Or from your local machine
curl http://<VPS_IP>:3000
```

---

## Part 4: Troubleshooting

### SSH Connection Issues

```bash
# Test SSH connection manually
ssh -i ~/.ssh/id_rsa -p 22 user@vps-host -v

# Common issues:
# - Permission denied: Check SSH key permissions (should be 600)
# - Connection refused: Verify VPS_PORT is correct
# - Host key verification failed: Add VPS to known_hosts:
ssh-keyscan -H vps-host >> ~/.ssh/known_hosts
```

### Docker Image Loading Issues

```bash
# Check image file exists on VPS
ls -lh /tmp/malasoafricasafarisclient-deploy/

# Verify Docker daemon is running
sudo systemctl status docker

# Check Docker disk space
docker system df
```

### Container Not Starting

```bash
# View detailed logs
docker logs -f malasoafricasafarisclient-app

# Check environment variables in container
docker exec malasoafricasafarisclient-app env

# Verify port is not in use
sudo netstat -tulpn | grep 3000

# Check container resource limits
docker stats malasoafricasafarisclient-app
```

### Pipeline Workflow Issues

1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on the failed step to see detailed error messages
4. Common issues:
   - **Build Failed**: Check Dockerfile or Node.js build errors
   - **Upload Failed**: Verify SSH credentials and VPS connectivity
   - **Deploy Failed**: Check deploy.sh script and permissions

---

## Part 5: Maintenance

### Regular Updates

```bash
# Update Docker images periodically
docker pull node:20-alpine

# Clean up old images and containers
docker system prune -a

# Update system packages
sudo apt update && sudo apt upgrade -y
```

### Monitoring

```bash
# Monitor container resource usage
docker stats

# View application logs
docker logs -f malasoafricasafarisclient-app --tail 100

# Check container uptime
docker inspect malasoafricasafarisclient-app | grep StartedAt
```

### Rollback to Previous Version

```bash
# Stop current container
docker stop malasoafricasafarisclient-app

# Load and run previous image (replace with actual commit SHA)
docker load < /backups/malasoafricasafarisclient-image-<previous-sha>.tar.gz
docker run -d \
    --name malasoafricasafarisclient-app \
    --restart unless-stopped \
    -p 3000:3000 \
    --env-file /opt/malasoafricasafarisclient/.env.docker \
    malasoafricasafarisclient:<previous-sha>
```

---

## Part 6: Security Best Practices

### SSH Key Management

```bash
# Use ED25519 keys (more secure than RSA)
ssh-keygen -t ed25519 -C "deployment@malasoafricasafarisclient"

# Never commit private keys to repository
echo "id_rsa" >> .gitignore
echo ".env*" >> .gitignore
```

### Environment Variables

- Never hardcode secrets in code
- Use GitHub Secrets for all sensitive data
- Database passwords should be strong and unique
- Rotate API keys regularly

### Firewall Configuration

```bash
# Allow SSH access
sudo ufw allow 22

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Restrict access to application port if behind reverse proxy
sudo ufw deny 3000
```

### Container Security

- Application runs as non-root user (nuxt user, UID 1001)
- Use read-only root filesystem when possible
- Keep base images updated
- Scan images for vulnerabilities

---

## Part 7: Useful Commands

### On VPS

```bash
# Check deployment
ssh user@vps-host 'docker ps | grep malasoafricasafarisclient'

# View recent logs
ssh user@vps-host 'docker logs --tail 50 malasoafricasafarisclient-app'

# Manual restart
ssh user@vps-host 'docker restart malasoafricasafarisclient-app'

# Manual stop
ssh user@vps-host 'docker stop malasoafricasafarisclient-app'
```

### On Local Machine

```bash
# View all workflow runs
gh run list --repo jamesmukumu/malasosafaris

# View specific run details
gh run view <run-id> --repo jamesmukumu/malasosafaris

# View workflow logs
gh run view <run-id> --log --repo jamesmukumu/malasosafaris
```

---

## Summary of All GitHub Secrets

| Secret Name | Example Value | Required | Purpose |
|---|---|---|---|
| VPS_HOST | `192.168.1.100` | ✅ | VPS hostname/IP |
| VPS_USERNAME | `ubuntu` | ✅ | SSH username |
| VPS_SSH_KEY | (private key contents) | ✅ | SSH private key for authentication |
| VPS_PORT | `22` | ✅ | SSH port |
| DEPLOYMENT_PATH | `/opt/malasoafricasafarisclient` | ✅ | Application directory on VPS |
| DB_HOST | `db.example.com` | ✅* | Database host |
| DB_PORT | `3306` | ✅* | Database port |
| DB_USER | `appuser` | ✅* | Database username |
| DB_PASS | (database password) | ✅* | Database password |
| DB_DATABASE | `malasoafricasafarisclient` | ✅* | Database name |
| CLOUDINARY_CLOUD_NAME | `dxxx` | ✅* | Cloudinary cloud name |
| CLOUDINARY_API_KEY | `xxx` | ✅* | Cloudinary API key |
| CLOUDINARY_API_SECRET | `xxx` | ✅* | Cloudinary API secret |

*Only required if your application uses these services

---

## Support

For issues or questions:
1. Check the GitHub Actions logs for error messages
2. Review the troubleshooting section above
3. Check Docker documentation: https://docs.docker.com
4. Check GitHub Actions documentation: https://docs.github.com/en/actions

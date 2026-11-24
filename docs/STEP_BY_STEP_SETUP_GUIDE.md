# Complete Step-by-Step Setup Guide
## Docker & CI/CD Pipeline Configuration

---

## 🖥️ PART 1: VPS SETUP (Server-Side Configuration)

### Prerequisites
- SSH access to your VPS
- Root or sudo privileges
- Basic command line knowledge

### Step 1: Connect to Your VPS

```bash
# Using Windows PowerShell, macOS Terminal, or Linux terminal
ssh ubuntu@YOUR_VPS_IP_ADDRESS

# Or if using custom SSH port
ssh -p 2222 ubuntu@YOUR_VPS_IP_ADDRESS

# Replace:
# - ubuntu = your username (might be root, admin, etc.)
# - YOUR_VPS_IP_ADDRESS = your VPS IP or hostname
# - 2222 = your SSH port (if not default 22)
```

**Example:**
```bash
ssh ubuntu@192.168.1.100
# or
ssh ubuntu@example.com
```

---

### Step 2: Update System Packages

```bash
# Update package manager
sudo apt update

# Upgrade packages
sudo apt upgrade -y

# Install common utilities
sudo apt install -y curl wget git
```

---

### Step 3: Install Docker

#### Option A: Automated Docker Installation (Recommended)

```bash
# Download and run Docker installation script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verify Docker installation
docker --version

# Expected output: Docker version 24.0.6 (or higher)
```

#### Option B: Manual Docker Installation

```bash
# Install Docker dependencies
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
docker --version
```

---

### Step 4: Configure Docker User Permissions

```bash
# Add current user to docker group (so you don't need sudo)
sudo usermod -aG docker $USER

# Apply group changes
newgrp docker

# Verify (should work without sudo)
docker ps

# Expected: Shows list of containers (empty list is fine)
```

---

### Step 5: Enable Docker Service Auto-Start

```bash
# Start Docker service
sudo systemctl start docker

# Enable Docker to start on system boot
sudo systemctl enable docker

# Verify Docker is running
sudo systemctl status docker

# Expected: Should show "active (running)"
```

---

### Step 6: Verify Docker Installation

```bash
# Test Docker installation
docker run hello-world

# Expected output:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

---

### Step 7: Create Deployment Directory

```bash
# Create directory for your application
sudo mkdir -p /opt/royalty

# Change ownership to your user
sudo chown $USER:$USER /opt/royalty

# Verify ownership
ls -ld /opt/royalty

# Expected: Shows your username as owner
```

---

### Step 8: Set Up SSH Key Authentication (If Not Already Done)

```bash
# Check if SSH key already exists
ls -la ~/.ssh/id_rsa

# If it doesn't exist, generate a new SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""

# Display public key (copy this for GitHub)
cat ~/.ssh/id_rsa.pub

# Display private key (copy this for GitHub VPS_SSH_KEY secret)
cat ~/.ssh/id_rsa
```

**Save the private key safely** - you'll need it for GitHub secrets!

---

### Step 9: Configure Firewall (if enabled)

```bash
# Check if firewall is active
sudo ufw status

# If active, allow SSH (port 22)
sudo ufw allow 22/tcp

# Allow port 3000 for the application
sudo ufw allow 3000/tcp

# Or allow port 80 and 443 if using a reverse proxy
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Reload firewall
sudo ufw reload
```

---

### Step 10: Test VPS Connectivity

```bash
# Test that everything is working
docker run hello-world

# Check Docker daemon
docker ps

# Check deployment directory
ls -la /opt/royalty

# All should work without errors
```

---

## ✅ VPS Setup Complete!

Your VPS is now ready for Docker deployments. Write down:
- ✅ VPS IP/Hostname
- ✅ SSH Port (usually 22)
- ✅ SSH Username (ubuntu, root, admin, etc.)
- ✅ Private SSH Key (from Step 8)
- ✅ Deployment path: `/opt/royalty`

---

---

## 🔑 PART 2: GITHUB SECRETS CONFIGURATION

### Where to Add Secrets

1. Go to your GitHub repository
2. Click: **Settings** (tab at top)
3. Click: **Secrets and variables** (left sidebar)
4. Click: **Actions** (submenu)
5. Click: **New repository secret** (green button)

**URL Pattern:** `https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions`

---

### Secrets to Add (13 Total)

---

## 📊 Section 1: DATABASE SECRETS (5 secrets)

These are for your backend database configuration.

### Secret 1: DB_HOST
```
Name: DB_HOST
Value: [Your database hostname or IP]

Examples:
  - db.example.com
  - 192.168.1.50
  - postgres.railway.app
  - your-db-server.c.mysqlcloud.com
```

**Where to find it:**
- Ask your database provider (Railway, AWS, Google Cloud, etc.)
- Check your existing backend configuration
- Run: `echo $DATABASE_URL` on your server

---

### Secret 2: DB_PORT
```
Name: DB_PORT
Value: [Your database port number]

Examples:
  - 5432 (PostgreSQL)
  - 3306 (MySQL)
  - 5433 (Custom port)
```

**How to find it:**
- PostgreSQL default: 5432
- MySQL default: 3306
- Check your database provider's documentation

---

### Secret 3: DB_USER
```
Name: DB_USER
Value: [Your database username]

Examples:
  - postgres
  - admin
  - root
  - myapp_user
```

**Where to find it:**
- Your database provider's dashboard
- Your .env file (locally)
- Your existing backend configuration

---

### Secret 4: DB_PASS
```
Name: DB_PASS
Value: [Your database password]

Examples:
  - MySecurePassword123!
  - (copy from your .env file)
```

**⚠️ Important:**
- Use the actual password
- Keep it secure
- GitHub encrypts secrets automatically

---

### Secret 5: DB_DATABASE
```
Name: DB_DATABASE
Value: [Your database name]

Examples:
  - royalty
  - royalty_db
  - royalty_production
```

**Where to find it:**
- Your database provider's dashboard
- Your existing backend configuration
- Usually specified in DATABASE_URL

---

## 🎨 Section 2: CLOUDINARY SECRETS (3 secrets)

These are for image management and storage.

### Secret 6: CLOUDINARY_CLOUD_NAME
```
Name: CLOUDINARY_CLOUD_NAME
Value: [Your Cloudinary cloud name]

Example:
  - mycloud123
  - james-safaris
```

**How to find it:**
1. Go to: https://cloudinary.com/console
2. Look at the top of the dashboard
3. Find your "Cloud name"

---

### Secret 7: CLOUDINARY_API_KEY
```
Name: CLOUDINARY_API_KEY
Value: [Your Cloudinary API key]

Example:
  - 123456789012345
  - 847593857385938
```

**How to find it:**
1. Go to: https://cloudinary.com/console/settings/api-keys
2. Copy your "API Key"
3. It's a long number

---

### Secret 8: CLOUDINARY_API_SECRET
```
Name: CLOUDINARY_API_SECRET
Value: [Your Cloudinary API secret]

Example:
  - abcdefghijklmnopqrstuvwxyz
  - a1b2c3d4e5f6g7h8i9j0
```

**⚠️ Important:**
- This is your secret - keep it safe
- Never commit to code
- GitHub encrypts it automatically

**How to find it:**
1. Go to: https://cloudinary.com/console/settings/api-keys
2. Copy your "API Secret"

---

## 🚀 Section 3: VPS DEPLOYMENT SECRETS (5 secrets)

These enable automated deployment to your VPS.

### Secret 9: VPS_HOST
```
Name: VPS_HOST
Value: [Your VPS IP address or hostname]

Examples:
  - 192.168.1.100
  - 45.33.123.45
  - vps.example.com
  - api.malasoafricasafaris.com
```

**How to find it:**
- Your VPS provider's control panel
- Email from your hosting provider
- Run on VPS: `hostname -I` or `curl ifconfig.me`

---

### Secret 10: VPS_USERNAME
```
Name: VPS_USERNAME
Value: [Your SSH username]

Examples:
  - ubuntu
  - root
  - admin
  - deployer
```

**How to find it:**
- SSH login username
- Check your VPS provider's documentation
- Usually: ubuntu, root, or admin
- Try: `whoami` command on your VPS

---

### Secret 11: VPS_SSH_KEY
```
Name: VPS_SSH_KEY
Value: [Your SSH private key - full content]

Format:
-----BEGIN RSA PRIVATE KEY-----
[Your entire private key content here]
-----END RSA PRIVATE KEY-----
```

**⚠️ IMPORTANT - HOW TO GET YOUR SSH PRIVATE KEY:**

#### If you already have SSH access:

1. SSH into your VPS:
```bash
ssh ubuntu@YOUR_VPS_IP
```

2. Display your private key:
```bash
cat ~/.ssh/id_rsa
```

3. Copy the ENTIRE output including:
   - `-----BEGIN RSA PRIVATE KEY-----`
   - `-----END RSA PRIVATE KEY-----`
   - All content in between

4. Paste into GitHub secret

#### If you don't have SSH set up:

1. On your local computer, generate a new key:
```bash
ssh-keygen -t rsa -b 4096 -f ~/my-vps-key -N ""
```

2. Display your private key (keep this safe):
```bash
cat ~/my-vps-key
```

3. Display your public key:
```bash
cat ~/my-vps-key.pub
```

4. Copy the PUBLIC key to your VPS:
```bash
# SSH into VPS first (might need password)
ssh ubuntu@YOUR_VPS_IP

# On VPS:
mkdir -p ~/.ssh
echo "PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
exit
```

5. Copy PRIVATE key to GitHub secret (the one without .pub)

**Example VPS_SSH_KEY format:**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3lCZwz7qVHD5vu... (many lines)
...
-----END RSA PRIVATE KEY-----
```

---

### Secret 12: VPS_PORT
```
Name: VPS_PORT
Value: [Your SSH port]

Examples:
  - 22 (default)
  - 2222 (custom)
  - 2022
```

**How to find it:**
- Default is usually 22
- Check your SSH config
- Ask your VPS provider

---

### Secret 13: DEPLOYMENT_PATH
```
Name: DEPLOYMENT_PATH
Value: [Path where app will run on VPS]

Value:
  /opt/royalty
```

**This is the path we created in VPS Setup Step 7**

---

## 🎯 GITHUB SECRETS STEP-BY-STEP

### How to Add Each Secret:

1. **Open GitHub Secrets Page**
   - Go to: `https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions`
   - Or: Repository → Settings → Secrets and variables → Actions

2. **For Each Secret Below:**
   - Click: **New repository secret** (green button)
   - Enter: **Name** (exactly as written)
   - Enter: **Value** (from your configuration)
   - Click: **Add secret**

3. **Repeat** for all 13 secrets

---

## ✅ GITHUB SECRETS CHECKLIST

Add these secrets in order:

### Database Secrets
- [ ] `DB_HOST` - Your database hostname
- [ ] `DB_PORT` - Your database port (5432, 3306, etc.)
- [ ] `DB_USER` - Your database username
- [ ] `DB_PASS` - Your database password
- [ ] `DB_DATABASE` - Your database name

### Cloudinary Secrets
- [ ] `CLOUDINARY_CLOUD_NAME` - From cloudinary.com/console
- [ ] `CLOUDINARY_API_KEY` - From cloudinary.com/console/settings/api-keys
- [ ] `CLOUDINARY_API_SECRET` - From cloudinary.com/console/settings/api-keys

### VPS Deployment Secrets
- [ ] `VPS_HOST` - Your VPS IP or hostname
- [ ] `VPS_USERNAME` - Your SSH username (ubuntu, root, etc.)
- [ ] `VPS_SSH_KEY` - Your full SSH private key
- [ ] `VPS_PORT` - Your SSH port (usually 22)
- [ ] `DEPLOYMENT_PATH` - `/opt/royalty`

---

## 🧪 TESTING YOUR SETUP

### Test 1: Verify GitHub Secrets Are Added

1. Go to: `https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions`
2. You should see **13 secrets** listed
3. Click on each one (you can't see the value, but verify they exist)

---

### Test 2: Test CI Workflow

1. Make a small change to your code (e.g., add a comment)
2. Push to `develop` branch:
```bash
git add .
git commit -m "Test CI workflow"
git push origin develop
```

3. Go to: **GitHub → Actions tab**
4. Watch the "CI" workflow run
5. Expected result: ✅ **Workflow passes** (all green checkmarks)

---

### Test 3: Verify SSH Access to VPS

```bash
# On your local computer
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP

# Should connect without password
# Should show VPS terminal prompt

# Check Docker is running
docker ps

# Exit
exit
```

---

### Test 4: Test Deploy Workflow

1. Push to `main` branch:
```bash
git add .
git commit -m "Test deployment pipeline"
git push origin main
```

2. Go to: **GitHub → Actions tab**
3. Watch both workflows run:
   - **CI** workflow runs first
   - If CI passes, **Deploy to VPS** workflow runs
4. Expected result: ✅ **All workflows pass**

---

### Test 5: Verify on VPS

```bash
# SSH into VPS
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP

# Check if container is running
docker ps

# Expected: Should show "royalty-app" container

# View logs
docker logs royalty-app -f

# Check application is accessible
curl http://localhost:3000

# Expected: Should return HTML content (not error)

# Exit
exit
```

---

## 🆘 TROUBLESHOOTING

### SSH Connection Fails

**Problem:** "Permission denied (publickey)"

**Solution:**
1. Verify SSH key is correct:
```bash
ssh -i ~/my-vps-key -v ubuntu@YOUR_VPS_IP
```

2. Check public key is on VPS:
```bash
ssh ubuntu@YOUR_VPS_IP "cat ~/.ssh/authorized_keys"
```

3. Verify permissions:
```bash
ssh ubuntu@YOUR_VPS_IP "ls -la ~/.ssh"
# Should show: 700 for directory, 600 for authorized_keys
```

---

### CI Workflow Fails

**Problem:** "Build failed" or "Dependencies not found"

**Solution:**
1. Check GitHub Actions logs:
   - Go to: Actions tab → Click workflow run
2. Look for specific error message
3. Common causes:
   - Missing environment variables in secrets
   - Node version issue
   - Build script issue

---

### Deploy Workflow Fails

**Problem:** "SSH command failed" or "Docker command not found"

**Solution:**
1. Verify SSH credentials:
   - VPS_HOST is correct
   - VPS_USERNAME is correct
   - VPS_SSH_KEY matches public key on VPS
   - VPS_PORT is correct (usually 22)

2. Verify Docker on VPS:
```bash
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP
docker --version
docker ps
```

3. Check deployment path exists:
```bash
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP
ls -la /opt/royalty
```

---

### Container Won't Start

**Problem:** Docker container exits immediately

**Solution:**
1. Check logs:
```bash
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP
docker logs royalty-app
```

2. Check if environment variables are set:
```bash
docker inspect royalty-app | grep Env
```

3. Verify database is accessible:
```bash
# Try connecting to database from VPS
psql -h DB_HOST -U DB_USER -d DB_DATABASE
```

---

## 📋 FINAL VERIFICATION CHECKLIST

Before considering setup complete:

### VPS Setup
- [ ] SSH access working
- [ ] Docker installed and running
- [ ] Docker command works without sudo
- [ ] Deployment directory created (`/opt/royalty`)
- [ ] Firewall configured (port 3000, SSH port)
- [ ] SSH key pair created

### GitHub Setup
- [ ] All 13 secrets added
- [ ] No typos in secret names
- [ ] Secret values are correct
- [ ] Repository is public or Actions are enabled

### Testing
- [ ] CI workflow passes on code push
- [ ] Deploy workflow triggers on main branch
- [ ] Container starts on VPS
- [ ] Application accessible at http://VPS_IP:3000

---

## 🎉 YOU'RE READY!

Once all checks pass, your CI/CD pipeline is fully operational:

✅ Code pushed to GitHub
✅ CI workflow tests your code
✅ Deploy workflow builds Docker image
✅ Image uploaded to VPS
✅ Container deployed automatically
✅ Application live at http://VPS_IP:3000

---

## 📞 QUICK REFERENCE

**VPS Access:**
```bash
ssh -i ~/my-vps-key ubuntu@YOUR_VPS_IP -p YOUR_PORT
```

**Check Docker:**
```bash
docker ps
docker logs royalty-app -f
docker stop royalty-app
docker start royalty-app
```

**Check Deployment:**
```bash
curl http://YOUR_VPS_IP:3000
```

**GitHub Secrets URL:**
```
https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions
```

**GitHub Actions URL:**
```
https://github.com/YOUR_USERNAME/royalty/actions
```

---

**Last Updated:** 2026-11-24  
**Status:** Ready to Deploy 🚀

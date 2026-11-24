# Malasoafrica Safaris Client - CI/CD Setup Checklist

Complete this checklist to ensure your deployment pipeline is fully configured.

## ✅ VPS Preparation (Do this on your VPS)

- [ ] VPS is running Ubuntu/Debian or compatible Linux distribution
- [ ] Have SSH access to VPS (can connect via `ssh user@vps-host`)
- [ ] Have sudo or root privileges on VPS
- [ ] Minimum 2GB RAM available
- [ ] Minimum 20GB free disk space
- [ ] Run: `sudo apt update && sudo apt upgrade -y`
- [ ] Docker installed: Run `sudo apt install -y docker.io`
- [ ] Docker running: `sudo systemctl start docker && sudo systemctl enable docker`
- [ ] Verify Docker: `docker --version` and `docker ps`
- [ ] Add user to docker group: `sudo usermod -aG docker $USER`
- [ ] Create deployment directory: `mkdir -p /opt/malasoafricasafarisclient`
- [ ] Create temp staging: `mkdir -p /tmp/malasoafricasafarisclient-deploy`
- [ ] SSH key accessible at `~/.ssh/id_rsa`
- [ ] SSH key has correct permissions (600): `ls -la ~/.ssh/id_rsa`
- [ ] Get VPS IP/hostname: `hostname -I`
- [ ] Get SSH port: `grep Port /etc/ssh/sshd_config | grep -v "^#"`

## 🔑 SSH Key Preparation

- [ ] Have SSH private key (create if missing: `ssh-keygen -t ed25519`)
- [ ] Private key is saved locally (default: `~/.ssh/id_rsa`)
- [ ] Can read private key contents: `cat ~/.ssh/id_rsa`
- [ ] Can verify SSH works: `ssh -i ~/.ssh/id_rsa user@vps-host`
- [ ] SSH key passphrase is EMPTY (for automated deployments)

## 🔐 GitHub Repository Secrets

### Required Infrastructure Secrets (5 total)

- [ ] Added `VPS_HOST` secret (your VPS IP or hostname)
  - Verify value: `echo ${{ secrets.VPS_HOST }}`
  - Example: `192.168.1.100` or `myvps.example.com`

- [ ] Added `VPS_USERNAME` secret (your SSH username)
  - Verify value exists: Check in Settings → Secrets
  - Example: `root`, `ubuntu`, or `malasoafricasafarisclient`

- [ ] Added `VPS_SSH_KEY` secret (full private SSH key)
  - Copied entire key including BEGIN/END lines
  - Verify syntax: Starts with `-----BEGIN` and ends with `-----END`
  - Verify on VPS: `ssh-keygen -y -f ~/.ssh/id_rsa` should show public key

- [ ] Added `VPS_PORT` secret (SSH port number)
  - Default value: `22`
  - Verify port is correct: `ssh -p <VPS_PORT> user@vps-host`

- [ ] Added `DEPLOYMENT_PATH` secret (application directory)
  - Example: `/opt/malasoafricasafarisclient`
  - Verify directory exists on VPS: `ls -la /opt/malasoafricasafarisclient`

### Database Secrets (5 total, if applicable)

- [ ] Added `DB_HOST` secret
- [ ] Added `DB_PORT` secret
- [ ] Added `DB_USER` secret
- [ ] Added `DB_PASS` secret
- [ ] Added `DB_DATABASE` secret

### Cloudinary Secrets (3 total, if applicable)

- [ ] Added `CLOUDINARY_CLOUD_NAME` secret
- [ ] Added `CLOUDINARY_API_KEY` secret
- [ ] Added `CLOUDINARY_API_SECRET` secret

## 📋 Repository Configuration

- [ ] Dockerfile exists and is correctly named: `.github/workflows/deploy.yml`
- [ ] Deploy workflow file exists: `.github/workflows/deploy.yml`
- [ ] Deploy script exists: `scripts/deploy.sh`
- [ ] Deploy script is executable: `ls -la scripts/deploy.sh | grep -E '^-rwx'`
- [ ] `.gitignore` includes:
  - [ ] `.env*` (environment files)
  - [ ] `id_rsa` (SSH keys)
  - [ ] `node_modules/`
  - [ ] `.output/`
  - [ ] `dist/`
- [ ] README.md is updated with deployment instructions
- [ ] All files committed to repository
- [ ] All changes pushed to `main` branch

## 🧪 Pre-Flight Testing

### On Your Local Machine

- [ ] Repository is cloned: `git clone https://github.com/jamesmukumu/malasosafaris.git`
- [ ] Can read SSH key: `cat ~/.ssh/id_rsa | head -5`
- [ ] Can test SSH to VPS: `ssh -i ~/.ssh/id_rsa -p 22 user@vps-host echo "✅ SSH works"`
- [ ] Repository branch is correct: `git branch` shows `main`
- [ ] No uncommitted changes: `git status` shows clean

### On Your VPS

- [ ] Can login via SSH: `ssh user@vps-host`
- [ ] Docker is running: `docker --version` works
- [ ] Can run docker commands: `docker ps` returns container list
- [ ] Deployment directory exists and is writable: `touch /opt/malasoafricasafarisclient/test && rm /opt/malasoafricasafarisclient/test`
- [ ] Can create temp directory: `mkdir -p /tmp/malasoafricasafarisclient-deploy`
- [ ] At least 20GB free: `df -h /` shows sufficient space
- [ ] Port 3000 is available: `netstat -tulpn | grep 3000` shows no conflicts

## 🚀 Initial Deployment

- [ ] All secrets added to GitHub
- [ ] Repository is on `main` branch
- [ ] All files are committed and pushed
- [ ] Go to GitHub **Actions** tab
- [ ] Trigger workflow by:
  - [ ] Making a small commit (e.g., update README)
  - [ ] Push to `main` branch: `git push origin main`
- [ ] Watch workflow in Actions tab (should start automatically)
- [ ] Workflow status:
  - [ ] `Build Docker image` - ✅ Success
  - [ ] `Save Docker image` - ✅ Success
  - [ ] `Upload image to VPS` - ✅ Success
  - [ ] `Deploy to VPS` - ✅ Success

## ✅ Post-Deployment Verification

### On Your VPS

- [ ] Container is running: `docker ps | grep malasoafricasafarisclient`
- [ ] Container status is healthy: `docker inspect malasoafricasafarisclient-app | grep -A5 Health`
- [ ] Check container logs: `docker logs malasoafricasafarisclient-app | head -20`
- [ ] No errors in logs: `docker logs malasoafricasafarisclient-app 2>&1 | grep -i error`
- [ ] Application is responding:
  - On VPS: `curl http://localhost:3000`
  - From local: `curl http://<VPS_IP>:3000`
- [ ] Proper user is running container: `docker inspect malasoafricasafarisclient-app | grep -i user`

### In GitHub

- [ ] Actions workflow shows green checkmark (success)
- [ ] All steps completed successfully
- [ ] No failed jobs or cancelled runs

## 📊 Ongoing Monitoring

### Daily/Weekly

- [ ] Check container is still running: `docker ps | grep malasoafricasafarisclient`
- [ ] Monitor disk space: `df -h /`
- [ ] Check Docker logs for errors: `docker logs malasoafricasafarisclient-app`
- [ ] Review GitHub Actions history for any failures

### Monthly

- [ ] Update system packages: `sudo apt update && sudo apt upgrade`
- [ ] Update Docker images: `docker pull node:20-alpine`
- [ ] Clean up old images: `docker system prune -a`
- [ ] Review and rotate secrets if needed

## 🆘 Troubleshooting Checklist

If deployment fails:

1. **Check GitHub Actions logs**
   - [ ] Go to Actions → Failed workflow
   - [ ] Click on failed step
   - [ ] Read error message carefully

2. **SSH Connection Issues**
   - [ ] Verify VPS is accessible: `ssh -i ~/.ssh/id_rsa user@vps-host`
   - [ ] Check secret values in GitHub
   - [ ] Verify SSH key format (should include BEGIN/END)
   - [ ] Confirm port number is correct

3. **Docker Build Failures**
   - [ ] Check Dockerfile syntax
   - [ ] Run build locally: `docker build -t test .`
   - [ ] Verify Node.js version compatibility

4. **Deployment Script Issues**
   - [ ] Check script syntax: `bash -n scripts/deploy.sh`
   - [ ] Verify script is executable: `chmod +x scripts/deploy.sh`
   - [ ] Run script manually on VPS (if safe)

5. **Container Not Running**
   - [ ] Check image loaded: `docker images | grep malasoafricasafarisclient`
   - [ ] Check container status: `docker ps -a | grep malasoafricasafarisclient`
   - [ ] View logs: `docker logs malasoafricasafarisclient-app`
   - [ ] Check port availability: `netstat -tulpn | grep 3000`

## 📚 Reference Documents

- **Full Setup Guide**: Read `VPS_GITHUB_SETUP_GUIDE.md`
- **Quick Secrets Reference**: Read `GITHUB_SECRETS_QUICK_REFERENCE.md`
- **Workflow File**: Check `.github/workflows/deploy.yml`
- **Deployment Script**: Check `scripts/deploy.sh`
- **Dockerfile**: Check `Dockerfile`

---

## Completion Status

- [ ] All VPS preparation steps completed
- [ ] All GitHub secrets added
- [ ] All repository files committed and pushed
- [ ] Initial deployment successful
- [ ] Application verified running on VPS
- [ ] Monitoring plan established

**Once all items are checked, your CI/CD pipeline is ready for production use!** ✅

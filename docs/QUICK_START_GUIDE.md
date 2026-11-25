# 🚀 Malasoafrica Safaris Client - Quick Start Guide

**Get your CI/CD pipeline running in 30 minutes!**

---

## ⚡ 5-Minute Overview

Your deployment pipeline works like this:

```
You push code to main branch
         ↓
GitHub Actions builds Docker image automatically
         ↓
Image uploaded to your VPS
         ↓
Application deployed and running
         ↓
✅ Done! No manual steps needed
```

---

## 📋 What You Need (Before Starting)

- [ ] VPS (Ubuntu/Debian) with SSH access
- [ ] SSH private key (create one if you don't have: `ssh-keygen -t ed25519`)
- [ ] VPS IP address or hostname
- [ ] VPS username (usually `root` or `ubuntu`)
- [ ] GitHub account access to this repository

---

## 🎯 Step 1: Prepare Your VPS (10 minutes)

**SSH into your VPS:**
```bash
ssh user@your-vps-ip
```

**Run these commands:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker ps

# Create app directory
sudo mkdir -p /opt/malasoafricasafarisclient
sudo chown $USER:$USER /opt/malasoafricasafarisclient

# Create temp directory
mkdir -p /tmp/malasoafricasafarisclient-deploy
```

**Done! Your VPS is ready.**

---

## 🔐 Step 2: Add GitHub Secrets (10 minutes)

**Get your SSH private key:**
```bash
cat ~/.ssh/id_rsa
```
*Copy the entire output including BEGIN and END lines*

**On GitHub:**
1. Go to your repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these 5 secrets:

| Name | Value | Example |
|------|-------|---------|
| `VPS_HOST` | Your VPS IP or hostname | `192.168.1.100` |
| `VPS_USERNAME` | SSH username | `ubuntu` |
| `VPS_SSH_KEY` | Your private SSH key | *Paste entire key* |
| `VPS_PORT` | SSH port | `22` |
| `DEPLOYMENT_PATH` | App path on VPS | `/opt/malasoafricasafarisclient` |

**Add database secrets if needed:**

| Name | Value |
|------|-------|
| `DB_HOST` | Database hostname |
| `DB_PORT` | Database port (3306 or 5432) |
| `DB_USER` | Database username |
| `DB_PASS` | Database password |
| `DB_DATABASE` | Database name |

**Add Cloudinary secrets if needed:**

| Name | Value |
|------|-------|
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary Dashboard |

---

## ✅ Step 3: Test the Pipeline (5 minutes)

**On your local machine:**
```bash
# Make sure you're on main branch
git checkout main

# Make a small test change
echo "# CI/CD Pipeline Configured" >> README.md

# Commit and push
git add .
git commit -m "test: CI/CD pipeline setup"
git push origin main
```

**Watch the pipeline:**
1. Go to GitHub **Actions** tab
2. Click on the workflow that's running
3. Watch it build, upload, and deploy
4. All steps should show ✅ green checkmarks

**Verify on your VPS:**
```bash
# Check if container is running
docker ps | grep malasoafricasafarisclient

# View logs
docker logs malasoafricasafarisclient-app

# Test the application
curl http://localhost:3000
```

**🎉 If you see the container running, you're done!**

---

## 📊 Deployment Workflow

Every time you push to `main`:

```
1. GitHub Actions detected push
2. Build Docker image (2-5 min)
3. Upload to VPS (1-2 min)
4. Deploy container (1-2 min)
5. Health check passes
6. ✅ Application updated
```

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| **"SSH permission denied"** | Verify `VPS_SSH_KEY` secret is complete (includes BEGIN/END lines) |
| **"Docker not found"** | Ensure Docker is installed: `sudo apt install -y docker.io` |
| **"Container not running"** | Check logs: `docker logs malasoafricasafarisclient-app` |
| **"Build failed"** | Check GitHub Actions logs for errors |
| **"Can't connect to VPS"** | Verify VPS_HOST, VPS_USERNAME, and VPS_PORT are correct |

---

## 📚 More Information

- **Full Setup Guide**: Read `VPS_GITHUB_SETUP_GUIDE.md` for detailed instructions
- **Setup Checklist**: Use `CI_CD_SETUP_CHECKLIST.md` to verify everything
- **Quick Reference**: See `GITHUB_SECRETS_QUICK_REFERENCE.md` for all secrets

---

## ✨ What Happens Now

✅ **Automatic Builds**
- Every push to `main` automatically triggers a build
- No manual Docker commands needed

✅ **Automatic Deployment**
- Built images are automatically uploaded to your VPS
- Container automatically stops and restarts
- No downtime management needed

✅ **Environment Variables**
- All secrets are passed securely
- No `.env` files needed in repo
- Database and API credentials protected

✅ **Health Monitoring**
- Pipeline verifies container is healthy
- Automatic rollback on failure
- Detailed logs in GitHub Actions

---

## 🚀 You're Ready!

Your CI/CD pipeline is now live. Here's what happens next:

1. **Day 1**: Make a commit, push to main, watch it deploy automatically
2. **Day 2+**: Just push code normally, deployment happens automatically
3. **Team**: Everyone can contribute, pipeline handles deployment

---

## 💡 Pro Tips

**Monitor deployments:**
```bash
# SSH to VPS and watch containers
watch -n 2 'docker ps | grep malasoafricasafarisclient'
```

**Check logs in real-time:**
```bash
docker logs -f malasoafricasafarisclient-app
```

**Test manually before pushing:**
```bash
docker build -t test .
docker run -p 3000:3000 test
```

---

## 🎓 Learning Path

1. ✅ You are here: Quick Start (5 steps)
2. → Full Setup Guide: `VPS_GITHUB_SETUP_GUIDE.md` (complete reference)
3. → Troubleshooting: Section 4 in setup guide
4. → Maintenance: Section 5 in setup guide

---

## ❓ Common Questions

**Q: Does this cost money?**
A: GitHub Actions is free for public repos. Docker and VPS have their own costs, but nothing new.

**Q: Can I deploy to multiple servers?**
A: Yes! Duplicate secrets for each VPS and add parallel jobs in the workflow.

**Q: What if deployment fails?**
A: Old container keeps running. Check logs and fix the issue. Next push will retry.

**Q: Can I deploy manually?**
A: Yes! Trigger workflow from GitHub Actions tab, or just push any change.

**Q: Is my data safe?**
A: Yes! Secrets are encrypted. SSH key never leaves GitHub. Database password never in logs.

---

## 🎉 That's It!

You now have a production-ready CI/CD pipeline. 

**Next step:** Make a test commit and watch it deploy!

```bash
git add .
git commit -m "feat: CI/CD pipeline is live!"
git push origin main
```

Then go to GitHub Actions and watch the magic happen ✨

---

**Questions?** Check the full guides in this repository.
**Ready to deploy?** Push to main and watch it go! 🚀

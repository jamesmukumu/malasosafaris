# Quick Reference Card
## VPS & GitHub Setup

---

## 🖥️ VPS SETUP - QUICK COMMANDS

### Copy-Paste Commands for VPS Setup

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# 4. Enable Docker auto-start
sudo systemctl start docker
sudo systemctl enable docker

# 5. Verify Docker works
docker run hello-world

# 6. Create deployment directory
sudo mkdir -p /opt/royalty
sudo chown $USER:$USER /opt/royalty

# 7. Check SSH keys (generate if needed)
ls ~/.ssh/id_rsa
# If not found, run:
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""

# 8. Display private key (copy this to GitHub)
cat ~/.ssh/id_rsa

# 9. Verify everything works
docker ps
ls -la /opt/royalty
```

---

## 🔑 GITHUB SECRETS - QUICK LOOKUP

### Where to find each secret value:

| Secret Name | Where to Find |
|-------------|---|
| DB_HOST | From your database provider's dashboard |
| DB_PORT | 5432 (PostgreSQL) or 3306 (MySQL) |
| DB_USER | Your database username |
| DB_PASS | Your database password |
| DB_DATABASE | Your database name |
| CLOUDINARY_CLOUD_NAME | cloudinary.com/console (top of page) |
| CLOUDINARY_API_KEY | cloudinary.com/console/settings/api-keys |
| CLOUDINARY_API_SECRET | cloudinary.com/console/settings/api-keys |
| VPS_HOST | Your VPS IP or hostname |
| VPS_USERNAME | SSH username (ubuntu, root, admin) |
| VPS_SSH_KEY | `cat ~/.ssh/id_rsa` on your VPS |
| VPS_PORT | Usually 22 (default SSH port) |
| DEPLOYMENT_PATH | `/opt/royalty` |

---

## 📝 GITHUB SECRETS SUBMISSION TEMPLATE

Use this template when adding secrets to GitHub:

```
1. DB_HOST
   Value: ___________________________

2. DB_PORT
   Value: ___________________________

3. DB_USER
   Value: ___________________________

4. DB_PASS
   Value: ___________________________

5. DB_DATABASE
   Value: ___________________________

6. CLOUDINARY_CLOUD_NAME
   Value: ___________________________

7. CLOUDINARY_API_KEY
   Value: ___________________________

8. CLOUDINARY_API_SECRET
   Value: ___________________________

9. VPS_HOST
   Value: ___________________________

10. VPS_USERNAME
    Value: ___________________________

11. VPS_SSH_KEY
    Value: 
    -----BEGIN RSA PRIVATE KEY-----
    [paste entire private key here]
    -----END RSA PRIVATE KEY-----

12. VPS_PORT
    Value: ___________________________

13. DEPLOYMENT_PATH
    Value: /opt/royalty
```

---

## ✅ STEP-BY-STEP GITHUB SECRETS SETUP

### 1. Open GitHub Secrets Page
```
URL: https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions
```

### 2. For Each Secret:
- Click: **New repository secret** (green button)
- Enter: **Name** (from list above)
- Enter: **Value** (from your data)
- Click: **Add secret**

### 3. Repeat Until All 13 Are Added

### 4. Verify
- Go back to secrets page
- Should see 13 secrets listed
- Names should match exactly

---

## 🧪 TESTING SEQUENCE

### Test 1: Code Push to Develop
```bash
git add .
git commit -m "Test CI workflow"
git push origin develop
```
✅ Expected: CI workflow runs and passes

---

### Test 2: Verify SSH Access
```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_VPS_IP

# On VPS:
docker ps
exit
```
✅ Expected: SSH works, Docker runs

---

### Test 3: Deploy to Main
```bash
git add .
git commit -m "Test deployment"
git push origin main
```
✅ Expected: Both CI and Deploy workflows run

---

### Test 4: Check App on VPS
```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_VPS_IP

# On VPS:
docker ps              # See container
docker logs royalty-app -f  # See logs
curl http://localhost:3000  # Test app

exit
```
✅ Expected: Container running, app accessible

---

## 🚨 TROUBLESHOOTING QUICK GUIDE

| Issue | Solution |
|-------|----------|
| "SSH permission denied" | Verify VPS_SSH_KEY matches public key on VPS |
| "Docker command not found" | SSH to VPS and verify: `docker --version` |
| "Build failed" | Check GitHub Actions logs for specific error |
| "Container won't start" | SSH to VPS and check: `docker logs royalty-app` |
| "App not accessible" | Verify firewall allows port 3000: `sudo ufw allow 3000/tcp` |
| "Secret not found" | Verify secret names spell exactly: DB_HOST (not db_host) |

---

## 📊 SECRETS CHECKLIST

Print this and check off as you add each:

**Database (5 secrets)**
- [ ] DB_HOST
- [ ] DB_PORT
- [ ] DB_USER
- [ ] DB_PASS
- [ ] DB_DATABASE

**Cloudinary (3 secrets)**
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET

**VPS Deployment (5 secrets)**
- [ ] VPS_HOST
- [ ] VPS_USERNAME
- [ ] VPS_SSH_KEY
- [ ] VPS_PORT
- [ ] DEPLOYMENT_PATH

**Total: 13 secrets**

---

## 🔗 IMPORTANT URLs

**GitHub Secrets:**
```
https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions
```

**GitHub Actions:**
```
https://github.com/YOUR_USERNAME/royalty/actions
```

**Cloudinary API Keys:**
```
https://cloudinary.com/console/settings/api-keys
```

---

## 💾 VPS INFO TO SAVE

After VPS setup, save this info:

```
VPS IP Address: ___________________________
SSH Port: ___________________________
SSH Username: ___________________________
Database Host: ___________________________
Database Port: ___________________________
Deployment Path: /opt/royalty
Docker Version: ___________________________
```

---

## ✨ WORKFLOW SUMMARY

```
Developer                 GitHub                           VPS
   |                         |                              |
   +--push to develop------->|                              |
                             |--run CI workflow---+          |
                             |                    |          |
                             |<---CI passes-------+          |
                             |                              |
   +--push to main---------->|                              |
                             |--run CI workflow---+          |
                             |                    |          |
                             |<---CI passes-------+          |
                             |                              |
                             |--run Deploy workflow-------->|
                             |                              |
                             |  - Build Docker image        |
                             |  - Upload to VPS             |
                             |  - Deploy container          |
                             |                              |
                             |<-Deploy complete------------|
                             |                              |
                             |           App running on port 3000
                             |           http://VPS_IP:3000
```

---

## 📞 COMMON COMMANDS

**On VPS:**
```bash
# Check Docker
docker ps
docker logs royalty-app -f
docker stop royalty-app
docker start royalty-app

# Check application
curl http://localhost:3000

# Check deployment directory
ls -la /opt/royalty

# Check logs in real-time
docker logs -f royalty-app
```

**SSH Access:**
```bash
# Using SSH key
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_VPS_IP

# Using custom port
ssh -i ~/.ssh/id_rsa -p 2222 ubuntu@YOUR_VPS_IP

# Copy SSH key
cat ~/.ssh/id_rsa
```

---

## 🎓 LEARNING RESOURCES

If you're new to these tools:

- **Docker**: https://docs.docker.com/get-started/
- **GitHub Actions**: https://docs.github.com/en/actions
- **SSH Keys**: https://www.ssh.com/ssh/key/
- **Cloudinary**: https://cloudinary.com/documentation

---

**Last Updated:** 2026-11-24  
**Status:** Ready to Use ✅

# Visual Setup Guide
## Step-by-Step with Command Examples

---

## 🎯 OVERVIEW

This guide shows you exactly what to do, step by step, with real examples.

---

## 📋 PHASE 1: VPS SETUP (30-45 minutes)

### Step 1: SSH into Your VPS

**What to do:**
1. Open terminal/PowerShell on your computer
2. Run the SSH command

**Command:**
```bash
ssh ubuntu@192.168.1.100
```

**Replace:**
- `ubuntu` = your username
- `192.168.1.100` = your VPS IP

**Expected Output:**
```
Welcome to Ubuntu 20.04.5 LTS (GNU/Linux 5.4.0-42-generic x86_64)
ubuntu@server:~$
```

✅ **If you see a prompt, you're connected!**

---

### Step 2: Update System Packages

**What to do:**
1. Copy the command below
2. Paste into VPS terminal
3. Wait for it to finish (may take 2-5 minutes)
4. Press `y` and Enter when asked

**Command:**
```bash
sudo apt update && sudo apt upgrade -y
```

**Expected Output:**
```
Reading package lists... Done
Building dependency tree... Done
Processing triggers for man-db (2.9.1-1) ...
```

✅ **If it finishes without errors, you're good!**

---

### Step 3: Install Docker

**What to do:**
1. Copy the command below
2. Paste into VPS terminal
3. Wait for installation (2-5 minutes)
4. It will run several steps

**Command:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Expected Output:**
```
# Executing docker install script, commit: 7cae5f8
...
Installation complete!
```

✅ **If you see "Installation complete!", Docker is installed!**

---

### Step 4: Verify Docker Installation

**What to do:**
1. Copy the command below
2. Paste into VPS terminal
3. You should see version information

**Command:**
```bash
docker --version
```

**Expected Output:**
```
Docker version 24.0.6, build ed223bc
```

✅ **If you see Docker version 20+, you're good!**

---

### Step 5: Configure Docker Permissions

**What to do:**
1. Copy the first command
2. Paste and press Enter
3. Copy the second command
4. Paste and press Enter

**Commands:**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

**Expected Output:**
```
(no output, just returns to prompt)
```

✅ **If you get a prompt back, it worked!**

---

### Step 6: Verify Docker Works Without Sudo

**What to do:**
1. Copy the command
2. Paste into terminal
3. You should see output with no errors

**Command:**
```bash
docker ps
```

**Expected Output:**
```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
(empty list is fine)
```

✅ **If you see the list (even if empty), Docker works!**

---

### Step 7: Enable Docker Auto-Start

**What to do:**
1. Copy both commands
2. Paste into terminal

**Commands:**
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

**Expected Output:**
```
(no output or just confirmation)
```

✅ **Docker will now start automatically when VPS boots!**

---

### Step 8: Create Deployment Directory

**What to do:**
1. Copy both commands
2. Paste into terminal

**Commands:**
```bash
sudo mkdir -p /opt/royalty
sudo chown $USER:$USER /opt/royalty
```

**Expected Output:**
```
(no output, just returns to prompt)
```

✅ **Deployment folder created!**

---

### Step 9: Verify Directory Was Created

**What to do:**
1. Copy the command
2. Paste into terminal

**Command:**
```bash
ls -la /opt/royalty
```

**Expected Output:**
```
total 8
drwxr-xr-x  2 ubuntu ubuntu 4096 Nov 24 10:00 .
drwxr-xr-x 10 root   root   4096 Nov 24 10:00 ..
```

✅ **If you see the directory listing, it's created!**

---

### Step 10: Set Up SSH Keys

**What to do:**
1. Check if SSH key exists
2. If not, generate one

**Command 1 - Check if key exists:**
```bash
ls -la ~/.ssh/id_rsa
```

**Expected Output:**
- If file exists: Shows `-rw------- 1 ubuntu ubuntu ...`
- If not found: `cannot access '/home/ubuntu/.ssh/id_rsa': No such file or directory`

**If not found, run Command 2 - Generate SSH key:**
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
```

**Expected Output:**
```
Generating public/private rsa key pair.
Your identification has been saved in /home/ubuntu/.ssh/id_rsa
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub
The key fingerprint is:
...
```

✅ **SSH key created!**

---

### Step 11: Get Your Private SSH Key

**What to do:**
1. Copy the command
2. Paste into terminal
3. Copy the entire output (including BEGIN and END lines)
4. Save it somewhere safe

**Command:**
```bash
cat ~/.ssh/id_rsa
```

**Expected Output:**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3lCZwz7qVHD5vu5qV...
... (many lines)
...
-----END RSA PRIVATE KEY-----
```

✅ **You now have your SSH private key!**

---

### Step 12: Configure Firewall (if enabled)

**What to do:**
1. Check if firewall is active
2. If yes, run the allow commands

**Command 1 - Check firewall status:**
```bash
sudo ufw status
```

**Expected Output:**
```
Status: active
(or)
Status: inactive
```

**If "active", run Command 2 - Allow ports:**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 3000/tcp
sudo ufw reload
```

**Expected Output:**
```
Rule added
Rule added
Firewall reloaded
```

✅ **Firewall configured!**

---

### Step 13: Verify VPS Setup Complete

**What to do:**
1. Run these commands to verify everything

**Commands:**
```bash
docker --version
docker ps
ls -la /opt/royalty
cat ~/.ssh/id_rsa | head -1
```

**Expected Output:**
```
Docker version 24.0.6, build ed223bc
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
(deployment directory listing)
-----BEGIN RSA PRIVATE KEY-----
```

✅ **VPS Setup is complete!**

---

## 📌 SAVE THIS INFORMATION

Copy this information - you'll need it for GitHub:

```
VPS_HOST: YOUR_VPS_IP_ADDRESS
VPS_USERNAME: ubuntu
VPS_PORT: 22
DEPLOYMENT_PATH: /opt/royalty

SSH Private Key:
(Copy from: cat ~/.ssh/id_rsa)
```

---

---

## 🔑 PHASE 2: GITHUB SECRETS SETUP (15-20 minutes)

### Step 1: Gather Your Information

**Before you start, collect these values:**

**Database Information:**
- DB_HOST: `________________`
- DB_PORT: `________________`
- DB_USER: `________________`
- DB_PASS: `________________`
- DB_DATABASE: `________________`

**Cloudinary Information:**
- CLOUDINARY_CLOUD_NAME: `________________`
- CLOUDINARY_API_KEY: `________________`
- CLOUDINARY_API_SECRET: `________________`

**VPS Information (from above):**
- VPS_HOST: `________________`
- VPS_USERNAME: `ubuntu`
- VPS_SSH_KEY: `(full private key)`
- VPS_PORT: `22`
- DEPLOYMENT_PATH: `/opt/royalty`

---

### Step 2: Open GitHub Secrets Page

**What to do:**
1. Open your browser
2. Go to this URL (replace YOUR_USERNAME):

```
https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions
```

**Example:**
```
https://github.com/jamesmukumu/royalty/settings/secrets/actions
```

**Expected:**
You should see a page with a **"New repository secret"** green button.

✅ **If you see the button, you're in the right place!**

---

### Step 3: Add Secret #1 - DB_HOST

**What to do:**
1. Click: **New repository secret** (green button)
2. Under "Name": Type `DB_HOST`
3. Under "Value": Paste your database hostname
4. Click: **Add secret**

**Example:**
```
Name:  DB_HOST
Value: db.example.com
```

**Expected:**
You'll be redirected back to the secrets page and see DB_HOST in the list.

✅ **1 of 13 secrets added!**

---

### Step 4: Add Secret #2 - DB_PORT

**What to do:**
1. Click: **New repository secret**
2. Name: `DB_PORT`
3. Value: Your database port
4. Click: **Add secret**

**Example:**
```
Name:  DB_PORT
Value: 5432
```

✅ **2 of 13 secrets added!**

---

### Step 5: Add Secret #3 - DB_USER

**What to do:**
1. Click: **New repository secret**
2. Name: `DB_USER`
3. Value: Your database username
4. Click: **Add secret**

**Example:**
```
Name:  DB_USER
Value: postgres
```

✅ **3 of 13 secrets added!**

---

### Step 6: Add Secret #4 - DB_PASS

**What to do:**
1. Click: **New repository secret**
2. Name: `DB_PASS`
3. Value: Your database password
4. Click: **Add secret**

**Example:**
```
Name:  DB_PASS
Value: MySecurePassword123!
```

✅ **4 of 13 secrets added!**

---

### Step 7: Add Secret #5 - DB_DATABASE

**What to do:**
1. Click: **New repository secret**
2. Name: `DB_DATABASE`
3. Value: Your database name
4. Click: **Add secret**

**Example:**
```
Name:  DB_DATABASE
Value: royalty_production
```

✅ **5 of 13 secrets added!**

---

### Step 8: Add Secret #6 - CLOUDINARY_CLOUD_NAME

**What to do:**
1. Go to https://cloudinary.com/console
2. Find your "Cloud name" at the top
3. Back on GitHub, click: **New repository secret**
4. Name: `CLOUDINARY_CLOUD_NAME`
5. Value: Your cloud name
6. Click: **Add secret**

**Example:**
```
Name:  CLOUDINARY_CLOUD_NAME
Value: mycloud123
```

✅ **6 of 13 secrets added!**

---

### Step 9: Add Secret #7 - CLOUDINARY_API_KEY

**What to do:**
1. Go to https://cloudinary.com/console/settings/api-keys
2. Copy your "API Key"
3. Back on GitHub, click: **New repository secret**
4. Name: `CLOUDINARY_API_KEY`
5. Value: Paste the API key
6. Click: **Add secret**

**Example:**
```
Name:  CLOUDINARY_API_KEY
Value: 847593857385938
```

✅ **7 of 13 secrets added!**

---

### Step 10: Add Secret #8 - CLOUDINARY_API_SECRET

**What to do:**
1. Go to https://cloudinary.com/console/settings/api-keys
2. Copy your "API Secret"
3. Back on GitHub, click: **New repository secret**
4. Name: `CLOUDINARY_API_SECRET`
5. Value: Paste the API secret
6. Click: **Add secret**

**Example:**
```
Name:  CLOUDINARY_API_SECRET
Value: a1b2c3d4e5f6g7h8i9j0
```

✅ **8 of 13 secrets added!**

---

### Step 11: Add Secret #9 - VPS_HOST

**What to do:**
1. Click: **New repository secret**
2. Name: `VPS_HOST`
3. Value: Your VPS IP address (from VPS setup)
4. Click: **Add secret**

**Example:**
```
Name:  VPS_HOST
Value: 192.168.1.100
```

✅ **9 of 13 secrets added!**

---

### Step 12: Add Secret #10 - VPS_USERNAME

**What to do:**
1. Click: **New repository secret**
2. Name: `VPS_USERNAME`
3. Value: Your SSH username (usually "ubuntu")
4. Click: **Add secret**

**Example:**
```
Name:  VPS_USERNAME
Value: ubuntu
```

✅ **10 of 13 secrets added!**

---

### Step 13: Add Secret #11 - VPS_SSH_KEY (Important!)

**What to do:**
1. Click: **New repository secret**
2. Name: `VPS_SSH_KEY`
3. Value: Paste your ENTIRE private SSH key (including BEGIN/END lines)
4. Click: **Add secret**

**Where to get it:**
On your VPS, run:
```bash
cat ~/.ssh/id_rsa
```

Copy the ENTIRE output including:
```
-----BEGIN RSA PRIVATE KEY-----
[entire key content]
-----END RSA PRIVATE KEY-----
```

**Example:**
```
Name:  VPS_SSH_KEY
Value: -----BEGIN RSA PRIVATE KEY-----
       MIIEpAIBAAKCAQEA3lCZwz...
       [many lines]
       -----END RSA PRIVATE KEY-----
```

⚠️ **Make sure you include the entire key with BEGIN and END lines!**

✅ **11 of 13 secrets added!**

---

### Step 14: Add Secret #12 - VPS_PORT

**What to do:**
1. Click: **New repository secret**
2. Name: `VPS_PORT`
3. Value: Your SSH port (usually 22)
4. Click: **Add secret**

**Example:**
```
Name:  VPS_PORT
Value: 22
```

✅ **12 of 13 secrets added!**

---

### Step 15: Add Secret #13 - DEPLOYMENT_PATH

**What to do:**
1. Click: **New repository secret**
2. Name: `DEPLOYMENT_PATH`
3. Value: `/opt/royalty` (this is what we created on VPS)
4. Click: **Add secret**

**Example:**
```
Name:  DEPLOYMENT_PATH
Value: /opt/royalty
```

✅ **13 of 13 secrets added!**

---

### Step 16: Verify All Secrets Are Added

**What to do:**
1. Go to your secrets page
2. You should see **13 secrets** listed

**Example of what you should see:**
```
Secrets
├── CLOUDINARY_API_KEY
├── CLOUDINARY_API_SECRET
├── CLOUDINARY_CLOUD_NAME
├── DB_DATABASE
├── DB_HOST
├── DB_PASS
├── DB_PORT
├── DB_USER
├── DEPLOYMENT_PATH
├── VPS_HOST
├── VPS_PORT
├── VPS_SSH_KEY
└── VPS_USERNAME
```

✅ **GitHub Secrets setup complete!**

---

## 🧪 PHASE 3: TEST YOUR SETUP (10-15 minutes)

### Test 1: Push to Develop Branch

**What to do:**
1. Open terminal on your computer
2. Run these commands:

```bash
cd /path/to/royalty
git add .
git commit -m "Test CI workflow"
git push origin develop
```

**Where to watch:**
1. Go to: https://github.com/YOUR_USERNAME/royalty/actions
2. Click on the workflow run
3. Watch it run in real-time

**Expected:**
- ✅ Install dependencies: PASS
- ✅ Lint: PASS (or skipped)
- ✅ Build: PASS
- ✅ Verify build: PASS

**If it fails:**
- Click on the failed step
- Read the error message
- Check if secrets are correct
- Look in TROUBLESHOOTING section

---

### Test 2: Verify SSH Works

**What to do:**
1. Run this command on your computer:

```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_VPS_IP

# On VPS, run:
docker ps

# Then exit
exit
```

**Expected:**
- ✅ SSH connects without password
- ✅ Docker shows container list
- ✅ No permission errors

---

### Test 3: Deploy to Main

**What to do:**
1. Push to main branch:

```bash
git add .
git commit -m "Test deployment"
git push origin main
```

**Where to watch:**
1. Go to: https://github.com/YOUR_USERNAME/royalty/actions
2. Watch both workflows run:
   - CI workflow first
   - Deploy workflow second

**Expected:**
- ✅ CI workflow: PASS
- ✅ Deploy workflow: PASS
- ✅ No SSH errors
- ✅ Container deployed

---

### Test 4: Check App on VPS

**What to do:**
1. SSH into VPS:

```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_VPS_IP

# On VPS, run:
docker ps          # See running container
docker logs royalty-app  # See application logs
curl http://localhost:3000  # Test if app responds

# Check if you see HTML output from curl
# Then exit
exit
```

**Expected:**
- ✅ Container named "royalty-app" is running
- ✅ Logs show no errors
- ✅ curl returns HTML (not error)

---

## ✅ SETUP COMPLETE!

If all tests passed, your CI/CD pipeline is fully operational!

You can now:
1. Push code to GitHub
2. CI workflow automatically tests your code
3. Deploy workflow automatically deploys to your VPS
4. App is automatically updated

---

## 🎉 YOU'RE DONE!

**What happens next:**
- Every push to `develop` → CI workflow runs
- Every push to `main` → CI runs, then Deploy runs
- Application automatically updated on VPS
- Zero manual deployment needed

**Happy deploying! 🚀**

---

**Last Updated:** 2026-11-24  
**All Systems Ready:** ✅

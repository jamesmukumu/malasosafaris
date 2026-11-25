# 🔑 How to Get Your VPS_SSH_KEY

**You are on your VPS (root@vultr) - Follow these steps RIGHT NOW**

---

## ✅ Quick Steps (2 minutes)

### Step 1: Run this command on your VPS terminal

```bash
cat ~/.ssh/id_rsa
```

**Expected output:**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x3f8vK9...
(many lines of random characters)
...aBcD1234eFgH5678
-----END RSA PRIVATE KEY-----
```

### Step 2: Copy EVERYTHING from `-----BEGIN` to `-----END`

- Highlight all text
- Copy (Ctrl+C)
- Include both the BEGIN and END lines

### Step 3: Go to GitHub and add the secret

1. Go to your repository: `https://github.com/jamesmukumu/malasosafaris`
2. Click **Settings** (top menu)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions** (should already be selected)
5. Click **"New repository secret"** (green button)
6. In the "Name" field, type: `VPS_SSH_KEY`
7. In the "Secret" field, paste your entire SSH key
8. Click **"Add secret"**

---

## ❓ What if `cat ~/.ssh/id_rsa` doesn't work?

### Error: "No such file or directory"

This means you don't have an SSH key yet. Create one:

```bash
ssh-keygen -t ed25519 -C "deployment@malasoafricasafarisclient"
```

**When prompted:**
- Press Enter (use default location)
- Press Enter (leave passphrase empty - IMPORTANT!)

Then display your new key:
```bash
cat ~/.ssh/id_ed25519
```

---

## 🔍 Check Your SSH Key

**Verify the key exists and has correct permissions:**

```bash
# List your SSH keys
ls -la ~/.ssh/

# Should show something like:
# -rw------- id_rsa
# -rw-r--r-- id_rsa.pub
```

**Check the key format:**
```bash
# Should show BEGIN and END
cat ~/.ssh/id_rsa | head -1
cat ~/.ssh/id_rsa | tail -1

# Output should be:
# -----BEGIN RSA PRIVATE KEY-----
# -----END RSA PRIVATE KEY-----
```

---

## 📋 Summary

| Item | Value |
|------|-------|
| **Secret Name** | `VPS_SSH_KEY` |
| **Secret Value** | Contents of `~/.ssh/id_rsa` |
| **How to get** | `cat ~/.ssh/id_rsa` on your VPS |
| **What to copy** | Entire output including BEGIN/END lines |
| **Where to add** | GitHub Settings → Secrets and variables → Actions |

---

## ✨ You'll Know It's Correct When

✅ The secret value starts with `-----BEGIN RSA PRIVATE KEY-----` or `-----BEGIN OPENSSH PRIVATE KEY-----`
✅ The secret value ends with `-----END RSA PRIVATE KEY-----` or `-----END OPENSSH PRIVATE KEY-----`
✅ The secret is added to your GitHub repository
✅ GitHub shows ✓ checkmark next to `VPS_SSH_KEY`

---

## 🆘 Still Having Issues?

**Command not working?**
```bash
# Try listing what keys you have
ls ~/.ssh/

# If you see id_rsa, try:
file ~/.ssh/id_rsa

# If you see id_ed25519, try:
cat ~/.ssh/id_ed25519
```

**Key looks wrong?**
- Check it starts with `-----BEGIN`
- Check it ends with `-----END`
- Check there are no extra spaces
- Check all line breaks are preserved

**Need a fresh key?**
```bash
# Backup old key (optional)
mv ~/.ssh/id_rsa ~/.ssh/id_rsa.bak

# Generate new key
ssh-keygen -t ed25519 -C "deployment@malasoafricasafarisclient"

# Display new key
cat ~/.ssh/id_ed25519
```

---

**Next:** After adding the secret, follow the [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) Step 3 to test your pipeline!

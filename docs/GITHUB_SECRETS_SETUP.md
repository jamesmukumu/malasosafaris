# GitHub Secrets Quick Reference

This file lists all the GitHub secrets that need to be configured for the Docker and CI/CD pipeline to work.

## How to Add Secrets

1. Go to: `https://github.com/YOUR_USERNAME/royalty/settings/secrets/actions`
2. Click: "New repository secret"
3. Enter each secret from the list below
4. Click: "Add secret"

---

## Secrets Required

### Database Secrets
```
Name: DB_HOST
Value: [Your database hostname, e.g., db.example.com]
```

```
Name: DB_PORT
Value: [Your database port, e.g., 5432]
```

```
Name: DB_USER
Value: [Your database username]
```

```
Name: DB_PASS
Value: [Your database password]
```

```
Name: DB_DATABASE
Value: [Your database name]
```

### Cloudinary Secrets
```
Name: CLOUDINARY_CLOUD_NAME
Value: [Your Cloudinary cloud name]
```

```
Name: CLOUDINARY_API_KEY
Value: [Your Cloudinary API key]
```

```
Name: CLOUDINARY_API_SECRET
Value: [Your Cloudinary API secret]
```

### VPS Deployment Secrets
```
Name: VPS_HOST
Value: [Your VPS IP or hostname, e.g., 192.168.1.100 or vps.example.com]
```

```
Name: VPS_USERNAME
Value: [SSH username for your VPS, e.g., ubuntu or root]
```

```
Name: VPS_SSH_KEY
Value: [Your private SSH key - full content including BEGIN/END lines]
```

**Example VPS_SSH_KEY format:**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA3lCZwz...
... (all lines of your private key)
-----END RSA PRIVATE KEY-----
```

```
Name: VPS_PORT
Value: [SSH port, usually 22]
```

```
Name: DEPLOYMENT_PATH
Value: [Path on VPS where app runs, e.g., /opt/royalty]
```

---

## Total Secrets to Add: 14

- DB_HOST
- DB_PORT
- DB_USER
- DB_PASS
- DB_DATABASE
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- VPS_HOST
- VPS_USERNAME
- VPS_SSH_KEY
- VPS_PORT
- DEPLOYMENT_PATH

---

## Verification Checklist

After adding all secrets, verify by:

1. **CI Workflow Test**:
   - Push to `develop` branch
   - Check Actions tab → "CI" workflow
   - Should complete without errors

2. **Deploy Workflow Test**:
   - Push to `main` branch
   - Check Actions tab → "Deploy to VPS" workflow
   - Should complete with successful deployment

3. **Verify on VPS**:
   ```bash
   ssh ubuntu@VPS_HOST -p VPS_PORT
   docker ps
   docker logs royalty-app
   ```

---

## Common Issues

**"SSH key permission denied"**
- Ensure the private key corresponds to the public key on your VPS
- Check `~/.ssh/authorized_keys` on VPS contains your public key

**"Connection refused"**
- Verify VPS_HOST and VPS_PORT are correct
- Ensure SSH is running: `sudo systemctl status ssh`

**"Docker command not found"**
- Install Docker on VPS: `curl -fsSL https://get.docker.com | sh`

**"Permission denied while trying to connect to Docker daemon"**
- Add user to docker group: `sudo usermod -aG docker $USER`

---

## Need Help?

Refer to: `DOCKER_CICD_SETUP.md` for detailed documentation

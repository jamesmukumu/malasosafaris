# GitHub Secrets Quick Reference

Add these secrets to your GitHub repository: **Settings → Secrets and variables → Actions**

## Essential Infrastructure Secrets

| Secret Name | Value | Notes |
|---|---|---|
| `VPS_HOST` | Your VPS IP or hostname | e.g., `192.168.1.100` or `vps.example.com` |
| `VPS_USERNAME` | SSH user | e.g., `root`, `ubuntu`, `malasoafricasafarisclient` |
| `VPS_SSH_KEY` | Full contents of private SSH key | Include `-----BEGIN` and `-----END` lines |
| `VPS_PORT` | SSH port number | Usually `22` |
| `DEPLOYMENT_PATH` | App directory on VPS | e.g., `/opt/malasoafricasafarisclient` |

## Database Secrets (if applicable)

| Secret Name | Value |
|---|---|
| `DB_HOST` | Database hostname/IP |
| `DB_PORT` | Database port (3306 for MySQL, 5432 for PostgreSQL) |
| `DB_USER` | Database username |
| `DB_PASS` | Database password |
| `DB_DATABASE` | Database name |

## Cloudinary Secrets (if applicable)

| Secret Name | Value |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary Dashboard |

## How to Get SSH Private Key

```bash
# Display your private key
cat ~/.ssh/id_rsa

# Or if using ed25519
cat ~/.ssh/id_rsa
```

Copy the entire output including the BEGIN and END lines, then paste into the `VPS_SSH_KEY` secret.

## Verifying SSH Connection Before Adding Secrets

```bash
# Test SSH connection
ssh -i ~/.ssh/id_rsa -p <VPS_PORT> <VPS_USERNAME>@<VPS_HOST>

# Should show: Last login: ...
# If it works, your credentials are correct!
```

## After Adding All Secrets

1. Go to **Actions** tab in GitHub
2. Make a commit to `main` branch
3. Watch the workflow run automatically
4. Check VPS to verify deployment: `docker ps | grep malasoafricasafarisclient`

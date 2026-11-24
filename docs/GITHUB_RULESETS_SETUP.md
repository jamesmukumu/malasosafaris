# GitHub Rulesets Configuration Guide

**Complete guide for setting up GitHub rulesets to protect your main branch and enforce CI/CD requirements**

---

## 📋 What These Rulesets Do

### 1. **Protect Main Branch - No Direct Push**
- ❌ Prevents direct pushes to `main` branch
- ✅ Requires all changes to go through pull requests
- ✅ Enforces CI/CD checks before merge
- ✅ Prevents force pushes
- ✅ Requires at least 1 approval
- ✅ Requires all review threads resolved

### 2. **CI/CD Checks on Pull Requests**
- ✅ Runs the build-and-deploy workflow on every PR
- ❌ Blocks merge if any checks fail
- ✅ Requires all status checks to pass
- ✅ Requires code review approval
- ✅ Prevents stale reviews

### 3. **Deployment Rules - Main Branch Only**
- ✅ Deployment only happens after merge to main
- ✅ Requires all CI/CD checks to pass
- ✅ Automatic deployment on successful merge

---

## 🚀 How to Set Up Rulesets

### Method 1: Web UI (Recommended)

#### Step 1: Go to Repository Settings
1. Navigate to: **https://github.com/jamesmukumu/malasosafaris**
2. Click **Settings** (top menu)
3. Click **Rules** (left sidebar under "Code and automation")
4. Click **New branch ruleset** (green button)

#### Step 2: Create First Ruleset (Protect Main Branch)

**Name:** `Protect Main Branch - No Direct Push`

**Target:** Branch

**Ref name pattern:** `main`

**Enforcement:** Active

**Rules to enable:**

✅ **Restrict who can push to matching refs**
   - Apply to admins: OFF
   - Restrict to pull requests: ON

✅ **Require pull request reviews before merging**
   - Required number of approvals: 1
   - Dismiss stale pull request approvals: ON
   - Require review of the most recent push: OFF

✅ **Require status checks to pass**
   - Require branches to be up to date: ON
   - Status checks: `build-and-deploy` (from your GitHub Actions workflow)

✅ **Require conversation resolution before merging**
   - ON

✅ **Require commits to be signed**
   - OFF (optional - enable if you want signed commits)

#### Step 3: Create Second Ruleset (CI/CD Checks)

**Name:** `CI/CD Checks on Pull Requests`

**Target:** Branch

**Ref name pattern:** `main`

**Enforcement:** Active

**Rules to enable:**

✅ **Require status checks to pass**
   - Require branches to be up to date: ON
   - Status checks: `build-and-deploy`

✅ **Require pull request reviews before merging**
   - Required number of approvals: 1
   - Dismiss stale pull request approvals: ON

#### Step 4: Create Third Ruleset (Deployment)

**Name:** `Deployment Rules - Main Branch Only`

**Target:** Branch

**Ref name pattern:** `main`

**Enforcement:** Active

**Rules to enable:**

✅ **Require status checks to pass**
   - Require branches to be up to date: ON
   - Status checks: `build-and-deploy`

---

### Method 2: Using REST API

```bash
# Authenticate with GitHub CLI
gh auth login

# Create ruleset from JSON file
gh api repos/jamesmukumu/malasosafaris/rulesets \
  --input github-rulesets.json
```

---

### Method 3: GitHub CLI

```bash
# Navigate to repository folder
cd F:\projects\royalty

# Create ruleset (interactive)
gh repo rule create

# When prompted:
# - Name: Protect Main Branch - No Direct Push
# - Branch pattern: main
# - Rules: Select rules as needed
```

---

## ✅ Verification Checklist

After setting up rulesets, verify everything is working:

- [ ] Go to Settings → Rules
- [ ] You see 3 active rulesets
- [ ] Each ruleset shows "Active" status
- [ ] Try to push directly to main (should fail):
  ```bash
  git push origin main
  # Should show: "remote: error: rule violation: ..."
  ```
- [ ] Try to merge PR without approval (should fail)
- [ ] Try to merge PR with failed checks (should fail)
- [ ] Create test PR, approve it, see automatic deployment

---

## 🔄 How the Workflow Works

### Developer Flow

```
1. Developer creates branch from main
   git checkout -b feature/new-feature

2. Developer pushes to branch
   git push origin feature/new-feature

3. Developer creates Pull Request
   - GitHub rulesets detected
   - CI/CD pipeline starts automatically

4. GitHub Actions workflow runs:
   ✅ Build Docker image
   ✅ Run tests (if any)
   ✅ Scan security issues
   ✅ Check code quality

5. Workflow status visible on PR

6. If all checks pass ✅:
   - Review button enabled
   - Developer requests review
   - Reviewer approves PR

7. If checks fail ❌:
   - Merge button disabled
   - Developer must fix issues
   - Re-push changes
   - CI/CD runs again

8. Merge to main (after approval + all checks pass)
   - Deployment workflow triggers automatically
   - Application builds and deploys to VPS
   - Health checks verify deployment

9. Main branch now has latest code
   - Production environment updated
   - Next developer fetches latest main
```

---

## 📊 Rulesets Configuration Details

### Ruleset 1: Protect Main Branch

| Setting | Value | Purpose |
|---------|-------|---------|
| Name | `Protect Main Branch - No Direct Push` | Identification |
| Target | Branch | Applies to branches |
| Ref pattern | `main` | Only for main branch |
| Enforcement | Active | Rules are enforced |
| Restrict pushes | Yes | Blocks direct push |
| Pull request required | Yes | Must use PR |
| Approvals required | 1 | At least 1 reviewer |
| Status checks | `build-and-deploy` | Pipeline must pass |
| Stale reviews | Dismissed | Updates require new review |
| Threads resolved | Yes | All comments addressed |

### Ruleset 2: CI/CD Checks

| Setting | Value | Purpose |
|---------|-------|---------|
| Name | `CI/CD Checks on Pull Requests` | Identification |
| Target | Branch | Applies to branches |
| Ref pattern | `main` | Only for main branch |
| Status checks | `build-and-deploy` | Pipeline required |
| Strict status | Yes | Must be up-to-date |
| Approvals | 1 | At least 1 reviewer |

### Ruleset 3: Deployment

| Setting | Value | Purpose |
|---------|-------|---------|
| Name | `Deployment Rules - Main Branch Only` | Identification |
| Target | Branch | Applies to branches |
| Ref pattern | `main` | Only for main branch |
| Status checks | `build-and-deploy` | Deployment trigger |

---

## 🔐 Bypass Exceptions

### Who Can Bypass Rules?

**Repository Admins:**
- Can bypass rules (if configured)
- Should NOT bypass - defeats the purpose
- Recommended: Disable admin bypass

**GitHub Apps:**
- Automatic deployments systems
- Merge bots
- Security scanning tools

**Recommended configuration:**
- NO bypass for anyone
- Forces all code through CI/CD
- Ensures quality and security

---

## ⚙️ GitHub Actions Workflow Integration

Your workflow MUST have matching status check name:

```yaml
# In .github/workflows/deploy.yml
jobs:
  build-and-deploy:  # ← This name must match ruleset
    runs-on: ubuntu-latest
    # ...
```

The status check name `build-and-deploy` must exactly match what's in your GitHub Actions workflow.

---

## 🚨 Common Issues & Solutions

### Issue: "Required status check not found"

**Problem:** Status check name in ruleset doesn't match workflow

**Solution:**
1. Go to your workflow: `.github/workflows/deploy.yml`
2. Find the job name: `jobs: → build-and-deploy:`
3. Use that exact name in ruleset: `build-and-deploy`

### Issue: "Cannot merge - all required checks must pass"

**Problem:** CI/CD pipeline failed

**Solution:**
1. Check GitHub Actions tab
2. Click failed workflow
3. Click failed step
4. Read error message
5. Fix the issue
6. Push changes (re-runs workflow)
7. Wait for all checks to pass
8. Then merge PR

### Issue: "Cannot push to main directly"

**Problem:** Rulesets are working! This is expected.

**Solution:**
1. This is correct behavior
2. Create a PR instead:
   ```bash
   git checkout -b feature/my-changes
   git push origin feature/my-changes
   # Create PR in GitHub UI
   ```

### Issue: "Cannot merge without approval"

**Problem:** Rulesets require code review

**Solution:**
1. Request review from team member
2. They review your PR
3. They click "Approve"
4. Then you can merge (if checks pass)

---

## 📈 Monitoring Your Rulesets

### View Rulesets Dashboard

1. Go to: **Settings → Rules**
2. See all active rulesets
3. Click ruleset name to see details
4. See bypass history

### View Enforcement History

1. Go to: **Settings → Rules**
2. Click ruleset name
3. Scroll to "History"
4. See all rule enforcement events

### Check PR Status

1. Go to: **Pull requests → (Your PR)**
2. Scroll to "Checks" section
3. See all required checks
4. See if merge is blocked and why

---

## 🔄 Making Changes to Rulesets

### Edit Rulesets

1. Go to: **Settings → Rules**
2. Click on ruleset name
3. Click **Edit** button
4. Make changes
5. Click **Save**

### Delete Rulesets

1. Go to: **Settings → Rules**
2. Click on ruleset name
3. Click **Delete** button
4. Confirm

### Create New Rulesets

1. Go to: **Settings → Rules**
2. Click **New branch ruleset**
3. Configure as needed

---

## 💡 Best Practices

### ✅ DO

- ✅ Keep at least 1 reviewer approval required
- ✅ Always require status checks to pass
- ✅ Require conversation resolution
- ✅ Use meaningful branch naming conventions
- ✅ Make PRs clear and descriptive
- ✅ Fix failed checks before merging
- ✅ Keep main branch stable
- ✅ Test locally before pushing

### ❌ DON'T

- ❌ Disable ruleset enforcement
- ❌ Bypass rulesets unnecessarily
- ❌ Approve PRs without reviewing
- ❌ Merge with failing checks
- ❌ Force push to main
- ❌ Delete main branch
- ❌ Ignore CI/CD failures
- ❌ Modify ruleset to bypass security

---

## 📞 Support & Troubleshooting

**GitHub Rulesets Documentation:**
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

**Protected Branches (Legacy):**
https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches

**GitHub Actions Documentation:**
https://docs.github.com/en/actions

---

## 📋 Configuration Summary

```
Main Branch Protection
├── No Direct Push
│   ├── Force push blocked
│   ├── Requires pull request
│   ├── Requires 1 approval
│   ├── Requires status checks (build-and-deploy)
│   └── Requires conversation resolution
├── CI/CD on Every PR
│   ├── build-and-deploy workflow must pass
│   ├── Requires 1 approval
│   └── Stale reviews dismissed
└── Auto-Deploy on Merge
    ├── Runs after merge to main
    ├── Requires all checks pass
    └── Builds and deploys to VPS
```

---

## ✅ You're Protected!

Your repository now has:
✅ No direct pushes to main
✅ All changes via pull requests
✅ CI/CD runs on every PR
✅ Code review required
✅ Automatic deployment after merge
✅ Production-grade protection

**Result:** High-quality code, safe deployments, team accountability 🎉

# GitHub Rulesets - Manual Web UI Setup Guide

**How to set up branch protection rulesets manually in GitHub (like Flora Advocates)**

---

## 🎯 Overview

You will create **3 rulesets** using GitHub's Web UI. No JSON import needed. Manual setup gives you full control.

**Total Time: 15 minutes**

---

## 📋 Rulesets to Create

| # | Name | Purpose | Branch |
|---|------|---------|--------|
| 1 | Protect Main Branch - No Direct Push | Block direct pushes to main | main |
| 2 | Require CI/CD Checks on PRs | Require CI/CD pass before merge | main |
| 3 | Deployment Rules | Auto-deploy after successful merge | main |

---

## 🚀 Step 1: Access Repository Rules

1. Go to: **https://github.com/jamesmukumu/malasosafaris**
2. Click: **Settings** (top right menu)
3. Click: **Rules** (left sidebar, under "Code and automation")
4. You should see: "Rules for the main branch" or "Create ruleset" button

---

## 📝 Step 2: Create Ruleset #1 - Protect Main Branch

### A. Start New Ruleset

1. Click: **New branch ruleset** (green button)
2. Name: `Protect Main Branch - No Direct Push`
3. Description: `Prevents direct pushes to main. All changes must go through pull requests with successful CI/CD checks.`
4. Target: Select **Branch**
5. Ref name condition: Select **main** (or check "Include default branch")

### B. Enable Rules for Ruleset #1

**Rule 1: Restrict Pushes**
- Toggle: **ON**
- Settings:
  - ✅ Restrict to pull request reviews
  - ✅ Require code owner review: OFF
  - ✅ Require review of the last commit author: OFF
  - Number of approving reviews: **1**
  - Dismiss stale reviews when new commits are pushed: ✅ ON
  - Require resolution of all conversations before merging: ✅ ON

**Rule 2: Require Status Checks**
- Toggle: **ON**
- Settings:
  - ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - Status checks that must pass:
    - Add: **build-and-deploy** (from your GitHub Actions workflow)

**Rule 3: Restrict Force Pushes**
- Toggle: **ON**
- (No additional settings needed)

**Rule 4: Restrict Deletions**
- Toggle: **ON**
- (No additional settings needed)

### C. Save Ruleset #1

1. Scroll to bottom
2. Click: **Create** (green button)
3. Wait for confirmation: "Ruleset created successfully"

---

## 📝 Step 3: Create Ruleset #2 - CI/CD Checks on PRs

### A. Start New Ruleset

1. Click: **New branch ruleset** (green button)
2. Name: `Require CI/CD Checks on PRs`
3. Description: `Runs CI/CD pipeline on every pull request and prevents merge until all checks pass.`
4. Target: Select **Branch**
5. Ref name condition: Select **main** (or check "Include default branch")

### B. Enable Rules for Ruleset #2

**Rule 1: Require Status Checks**
- Toggle: **ON**
- Settings:
  - ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - Status checks that must pass:
    - Add: **build-and-deploy**

**Rule 2: Require Pull Request Reviews**
- Toggle: **ON**
- Settings:
  - Number of approving reviews: **1**
  - Dismiss stale reviews when new commits are pushed: ✅ ON
  - Require code owner review: OFF
  - Require review of the last commit author: OFF

### C. Save Ruleset #2

1. Click: **Create** (green button)
2. Wait for confirmation

---

## 📝 Step 4: Create Ruleset #3 - Deployment Rules

### A. Start New Ruleset

1. Click: **New branch ruleset** (green button)
2. Name: `Deployment Rules - Main Branch Only`
3. Description: `Deployment workflow only runs after successful merge to main with all checks passing.`
4. Target: Select **Branch**
5. Ref name condition: Select **main** (or check "Include default branch")

### B. Enable Rules for Ruleset #3

**Rule 1: Require Status Checks**
- Toggle: **ON**
- Settings:
  - ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - Status checks that must pass:
    - Add: **build-and-deploy**

### C. Save Ruleset #3

1. Click: **Create** (green button)
2. Wait for confirmation

---

## ✅ Verification - Confirm All Rulesets Created

1. Go to: **Settings → Rules**
2. You should see all 3 rulesets listed:
   - ✅ Protect Main Branch - No Direct Push
   - ✅ Require CI/CD Checks on PRs
   - ✅ Deployment Rules - Main Branch Only
3. All should show: **Active** status (blue indicator)

---

## 🧪 Test Ruleset #1 - Confirm Direct Push Blocked

### Test: Try Direct Push (Should Fail)

```bash
cd F:\projects\royalty

# Switch to main
git checkout main

# Make a change
echo "test" >> README.md

# Try to commit and push
git add README.md
git commit -m "test: direct push to main"
git push origin main
```

### Expected Result

```
remote: error: rule violation: ...
remote: ref matched the following rulesets: 
remote: - Protect Main Branch - No Direct Push
fatal: could not read from remote repository.
```

✅ **SUCCESS** - Direct push is blocked! Ruleset #1 works.

---

## 🧪 Test Ruleset #2 - Confirm PR Triggers CI/CD

### Test: Create PR (Should Trigger CI/CD)

```bash
# Create feature branch
git checkout -b feature/test-rulesets

# Make a change
echo "test from feature branch" >> README.md

# Commit and push
git add README.md
git commit -m "test: CI/CD trigger"
git push origin feature/test-rulesets
```

1. Go to: GitHub repo → Pull requests
2. Click: Create pull request
3. Base: **main** ← Compare: **feature/test-rulesets**
4. Click: **Create pull request**
5. Wait 30 seconds...

### Expected Result

You should see:
- ✅ GitHub Actions running: "build-and-deploy" workflow started
- ✅ Status check running: Yellow spinner next to commit
- ✅ Merge button disabled: "1 of 1 checks are failing" (until workflow passes)

✅ **SUCCESS** - CI/CD triggered on PR!

---

## 🧪 Test Ruleset #2 & #3 - Confirm Approval Required

### Test: Try to Merge Without Approval (Should Fail)

1. Go to: Pull request you created
2. Scroll to: "Merge pull request" button
3. Try clicking it...

### Expected Result

```
Error message appears:
"At least 1 approval is required by reviewers with write access 
 before this pull request can be merged"
```

Also:
```
"Required status checks must pass"
(If your build-and-deploy workflow is still running)
```

✅ **SUCCESS** - Approval and CI/CD both required!

---

## 🧪 Test Complete Flow - Merge & Auto-Deploy

### Step 1: Wait for CI/CD to Pass

1. Go to: Pull request
2. Wait for: "build-and-deploy" workflow to complete
3. Check: Status shows ✅ All checks passed

### Step 2: Request Code Review

1. On PR, go to: "Reviewers" (right side)
2. Click: Add yourself as reviewer
   - Or tag a team member

### Step 3: Approve PR

1. Click: "Review changes" (green button, top right)
2. Click: "Approve"
3. Click: "Submit review"

### Step 4: Merge PR

1. Click: "Merge pull request"
2. Choose merge strategy:
   - **Squash and merge** (recommended for clean history)
   - **Create a merge commit** (default)
   - **Rebase and merge** (linear history)
3. Click: "Confirm merge"
4. Wait for: "Pull request successfully merged"

### Step 5: Confirm Auto-Deployment

1. Go to: **Actions** tab (top menu)
2. Look for: "build-and-deploy" workflow running
3. Wait for: Workflow to complete
4. Check: Logs show:
   - ✅ Docker image built
   - ✅ Image uploaded to VPS
   - ✅ Container deployed
   - ✅ Health checks passed

✅ **SUCCESS** - Full workflow complete!

---

## 📊 Expected Workflow After Rulesets

```
Developer Branch
      ↓
 Write Code
      ↓
 git push → feature/feature-name
      ↓
 Create PR on GitHub
      ↓
 GitHub Actions Runs:
   • build-and-deploy workflow triggers
   • Docker image builds
   • Tests run
   • Status check shows
      ↓
 If PASSED ✅:
   • Merge button enabled
   • Request reviewer
   • Reviewer approves
      ↓
 If FAILED ❌:
   • Merge button disabled
   • Fix issues
   • Push again
   • Workflow re-runs
      ↓
 Developer Merges PR
   • Clicking "Merge" button
   • PR merged to main
      ↓
 GitHub Detects Merge to Main
   • Deployment workflow triggers
      ↓
 Auto-Deployment to VPS:
   • Docker image builds (again)
   • Image uploaded to VPS
   • Container stops/starts
   • Health checks verify
   • App is live
      ↓
 ✅ Application Updated on VPS
```

---

## ⚙️ Finding the Status Check Name

**Important:** The status check name must be exactly: `build-and-deploy`

This comes from your `.github/workflows/deploy.yml` file:

```yaml
jobs:
  build-and-deploy:  # ← This is the status check name
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # ... more steps ...
```

If your workflow job has a different name, use that name instead.

To find the correct name:
1. Go to: **Actions** tab
2. Click: **build-and-deploy** workflow
3. Look at job name in the workflow run
4. Use that exact name in rulesets

---

## 🔧 Troubleshooting

### Problem: "Status check not found"

**Solution:**
- Status checks only appear after the workflow has run at least once
- Create a test PR first to trigger the workflow
- Then go back to ruleset and add the status check name

### Problem: "Merge button still disabled"

**Solution:**
1. Check: Does the workflow pass?
   - Go to: Actions tab
   - Look for: "build-and-deploy" showing ✅
2. Check: Is there an approval?
   - Go to: Pull request → Reviewers
   - Confirm: At least 1 approval from team member
3. Check: Are all conversations resolved?
   - Go to: Pull request → Comments
   - Reply to any pending comments

### Problem: Can't create new ruleset

**Solution:**
1. Check: You have admin access to repository
   - Go to: Settings → Collaborators
   - Confirm: You are listed as "Admin"
2. Check: You're on a GitHub Pro plan or higher
   - GitHub rulesets require: "GitHub Pro" or "GitHub Enterprise"
   - Free plans don't support rulesets
3. Check: You're not hitting the rulesets limit
   - Each repository can have: Multiple rulesets
   - Soft limit: Usually 100+ rulesets

### Problem: Status check shows as "pending" always

**Solution:**
1. Check: Workflow YAML is correct
   - File: `.github/workflows/deploy.yml`
   - Has: `jobs:` → `build-and-deploy:`
2. Check: Workflow triggers on PR
   - File: `.github/workflows/deploy.yml`
   - Has: `on: [pull_request, push]` or similar
3. Check: No workflow syntax errors
   - Go to: Actions tab
   - Look for: Red X on workflow runs

---

## ✨ What You've Accomplished

✅ Created 3 professional rulesets
✅ Protected main branch from direct pushes
✅ Enforced mandatory code reviews
✅ Enforced mandatory CI/CD checks
✅ Automated deployment on merge
✅ Zero manual deployment steps
✅ Full audit trail for all changes
✅ Team accountability established

---

## 🎓 Next Steps

1. **Share with team:**
   - Send: This guide to your team
   - Explain: New workflow and rules

2. **Train team (10 minutes):**
   - Demo: Create a test PR
   - Show: CI/CD running
   - Show: Approval required
   - Show: Auto-deployment

3. **Start using:**
   - All changes now go through: PR → Review → Merge → Auto-deploy
   - No more manual deployments needed

---

## 📚 Additional Resources

- **Full Setup Guide:** `VPS_GITHUB_SETUP_GUIDE.md`
- **Quick Reference:** `GITHUB_RULESETS_QUICK_SETUP.md`
- **CI/CD Guide:** `QUICK_START_GUIDE.md`

---

**Setup complete! Your main branch is now protected with enterprise-grade controls.**

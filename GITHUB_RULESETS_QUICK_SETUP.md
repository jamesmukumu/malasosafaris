# GitHub Rulesets - Quick Setup Guide

**5-minute setup for branch protection and CI/CD enforcement**

---

## 🎯 What You're Setting Up

```
Direct Push to Main?     ❌ NO
Pull Request Required?   ✅ YES
CI/CD Check Required?    ✅ YES
Code Review Required?    ✅ YES (1 approval)
Deployment on Merge?     ✅ YES (automatic)
```

---

## ⚡ 3 Simple Rulesets to Create

### Ruleset 1: Protect Main Branch

**Location:** Settings → Rules → New branch ruleset

**Settings:**
- Name: `Protect Main Branch - No Direct Push`
- Target: Branch
- Branch: `main`
- Enforcement: Active

**Rules to Enable:**
- ✅ Restrict who can push (apply to admins: OFF)
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks (build-and-deploy)
- ✅ Require conversation resolution

**Result:** ✅ Direct push to main is blocked

---

### Ruleset 2: CI/CD Checks

**Location:** Settings → Rules → New branch ruleset

**Settings:**
- Name: `CI/CD Checks on Pull Requests`
- Target: Branch
- Branch: `main`
- Enforcement: Active

**Rules to Enable:**
- ✅ Require status checks (build-and-deploy)
- ✅ Require pull request reviews (1 approval)
- ✅ Require branches to be up to date

**Result:** ✅ All PRs require passing CI/CD before merge

---

### Ruleset 3: Deployment Rules

**Location:** Settings → Rules → New branch ruleset

**Settings:**
- Name: `Deployment Rules - Main Branch Only`
- Target: Branch
- Branch: `main`
- Enforcement: Active

**Rules to Enable:**
- ✅ Require status checks (build-and-deploy)

**Result:** ✅ Deployment only happens after successful merge

---

## 🚀 Step-by-Step Setup

### Step 1: Open Repository Settings
```
1. Go to: https://github.com/jamesmukumu/malasosafaris
2. Click: Settings (top menu)
3. Click: Rules (left sidebar)
```

### Step 2: Create First Ruleset
```
1. Click: New branch ruleset (green button)
2. Name: Protect Main Branch - No Direct Push
3. Target: Branch (dropdown)
4. Include default branch: Check the box
5. Scroll down and enable rules (see below)
```

### Step 3: Enable Rules for Ruleset 1
```
Toggle ON these rules:

✅ Restrict pushes that match this pattern
   - Apply to admins: OFF
   - Restrict to pull requests: ON

✅ Require pull request reviews before merging
   - Required number of approvals: 1
   - Dismiss stale reviews: ON

✅ Require status checks to pass
   - Require branches to be up to date: ON
   - Status checks:
     - Build-and-deploy

✅ Require all conversations to be resolved
```

### Step 4: Save First Ruleset
```
Click: Create (green button at bottom)
```

### Step 5: Create Second & Third Rulesets
```
Repeat Steps 2-4 for the other 2 rulesets
(See quick settings above)
```

### Step 6: Verify All Rulesets
```
1. Go to: Settings → Rules
2. You should see 3 active rulesets
3. All showing "Active" status
```

---

## ✅ Verification Test

### Test 1: Try Direct Push (Should Fail)
```bash
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "test"
git push origin main

# Expected: ERROR
# remote: error: rule violation: ...
```

✅ **PASS** - Direct push blocked (this is good!)

---

### Test 2: Try PR Merge (Should Work)
```bash
# Create feature branch
git checkout -b feature/test-ruleset
echo "test" >> README.md
git add README.md
git commit -m "test: ruleset verification"
git push origin feature/test-ruleset

# Create PR in GitHub UI
# - GitHub shows CI/CD running
# - Request review
# - Reviewer approves
# - Merge (button now enabled)

# Check GitHub Actions
# - Deployment workflow starts automatically
# - Application deploys to VPS
```

✅ **PASS** - PR workflow and auto-deploy work!

---

## 📊 Expected Behavior After Setup

### When Developer Pushes to Feature Branch
```
1. Git push → feature/test-ruleset
2. GitHub detects push
3. CI/CD pipeline starts (build-and-deploy)
4. Status checks appear on PR
```

### When CI/CD Passes ✅
```
1. Build succeeded
2. Image created
3. Ready for review
4. Merge button shows "Waiting for review"
```

### When Reviewer Approves PR
```
1. Code review completed
2. Approval added
3. All checks pass
4. Merge button now ENABLED
```

### When Developer Merges to Main
```
1. Merge PR to main
2. Deployment workflow triggers
3. Docker image uploads to VPS
4. Application deploys automatically
5. Health checks verify
6. Deployment complete! ✨
```

---

## 🔄 Developer Workflow (After Setup)

**Before (Without Rulesets):**
```
Developer writes code
        ↓
Direct push to main (risky!)
        ↓
Deployment (might be broken)
```

**After (With Rulesets):**
```
Developer writes code
        ↓
Create feature branch
        ↓
Push to feature branch
        ↓
Create PR
        ↓
CI/CD automatically runs
        ↓
Reviewer reviews code
        ↓
If all checks pass + approved:
   Merge to main
        ↓
Deployment automatically runs
        ↓
App deployed safely ✅
```

---

## 📋 Ruleset Configuration Reference

### Status Check Name
```
MUST MATCH your GitHub Actions workflow name:

In .github/workflows/deploy.yml:
  jobs:
    build-and-deploy:  ← Use this name in ruleset

In ruleset:
  Status checks: build-and-deploy  ← Must match exactly
```

### Branch Pattern
```
main      = Only main branch
release/* = All release branches
*         = All branches
dev       = Only dev branch
```

### Enforcement Levels
```
Active   = Rules are enforced (use this)
Evaluate = Test mode (don't use)
Disabled = Rules disabled (don't use)
```

---

## ❌ Common Mistakes to Avoid

### ❌ Mistake 1: Wrong Status Check Name
```
Workflow name: build-and-deploy
Ruleset name: deploy

Result: "Required status check not found"
Solution: Make them match exactly!
```

### ❌ Mistake 2: Admin Bypass Enabled
```
"Apply to admins: ON"

Result: Admins can bypass all rules
Solution: Set to OFF
```

### ❌ Mistake 3: No Status Checks
```
No "Require status checks" enabled

Result: Can merge with failing CI/CD
Solution: Enable status check requirement
```

### ❌ Mistake 4: Branch Pattern Wrong
```
Pattern: main (but default branch is master)

Result: Rules don't apply
Solution: Use correct branch name
```

---

## ✨ What You Achieved

After setup:

✅ **No Direct Push to Main**
   - All changes must go through PR
   - Developer pushes to feature branch
   - Creates PR for review

✅ **CI/CD Runs on Every PR**
   - Automatic build
   - Automatic test (if any)
   - Status visible on PR

✅ **Code Review Required**
   - At least 1 approval needed
   - Merge blocked without review
   - Team accountability

✅ **Automatic Deployment**
   - After merge to main
   - Only if all checks pass
   - Zero-manual-step deployment

✅ **Safe Production**
   - Only tested code on production
   - Only approved code on production
   - Automatic verification

---

## 🎓 Next Steps

1. ✅ Create the 3 rulesets (this guide)
2. ✅ Test with feature branch (verification test)
3. ✅ Educate team on new workflow (send guide)
4. ✅ Monitor enforcement (Settings → Rules → History)

---

## 📞 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't merge PR | Check: (1) CI/CD pass? (2) Reviewed? (3) Threads resolved? |
| Can't push to main | Good! This is working. Use PR instead. |
| CI/CD not running | Check: Status check name matches workflow |
| Merge button disabled | Wait for: (1) CI/CD pass, (2) Review approval |
| Rules not applying | Check: Ruleset is "Active" and branch pattern matches |

---

## ✅ You're Done!

Your repository is now protected with:
- Enterprise-grade branch protection
- Mandatory CI/CD pipeline
- Code review enforcement
- Automatic deployments

**Result: Safe, tested, reviewed code in production** 🚀

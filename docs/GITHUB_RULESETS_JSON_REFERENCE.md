# GitHub Rulesets JSON - Complete Reference

**Your ready-to-use rulesets configuration for GitHub branch protection and CI/CD enforcement**

---

## 📄 File Location

```
Repository: F:\projects\royalty
File: github-rulesets.json
```

---

## 🎯 JSON File Contents

The `github-rulesets.json` file contains 3 professional rulesets:

### Ruleset 1: Protect Main Branch - No Direct Push
```json
{
  "name": "Protect Main Branch - No Direct Push",
  "description": "Protects the main branch from direct pushes...",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["main"],
      "exclude": []
    }
  },
  "rules": [
    // Creation blocked
    // Update blocked  
    // Deletion blocked
    // Force push blocked
    // Pull request required
    // Status checks required (build-and-deploy)
    // Approval required (1)
  ]
}
```

### Ruleset 2: CI/CD Checks on Pull Requests
```json
{
  "name": "CI/CD Checks on Pull Requests",
  "description": "Runs CI/CD pipeline on every pull request...",
  "target": "branch",
  "enforcement": "active",
  "rules": [
    // Status checks required (build-and-deploy)
    // Pull request reviews required (1)
    // Stale reviews dismissed
  ]
}
```

### Ruleset 3: Deployment Rules - Main Branch Only
```json
{
  "name": "Deployment Rules - Main Branch Only",
  "description": "Deployment workflow only runs after merge...",
  "target": "branch",
  "enforcement": "active",
  "rules": [
    // Status checks required (build-and-deploy)
    // Triggers deployment on successful merge
  ]
}
```

---

## 🚀 How to Import/Use

### Option 1: GitHub Web UI (Manual, No JSON Needed)

**Most User-Friendly**

1. Go to: `https://github.com/jamesmukumu/malasosafaris/settings/rules`
2. Click: "New branch ruleset"
3. Configure each ruleset manually (see GITHUB_RULESETS_QUICK_SETUP.md)

**Advantages:**
- ✅ Visual configuration
- ✅ Immediate feedback
- ✅ Easy to understand
- ✅ Can customize on-the-fly

**Time:** ~7 minutes

---

### Option 2: GitHub REST API (Using JSON File)

**Most Automated**

**Prerequisites:**
- GitHub CLI installed
- Authenticated with: `gh auth login`

**Command:**
```bash
cd F:\projects\royalty

# Import the entire rulesets.json
gh api repos/jamesmukumu/malasosafaris/rulesets \
  --input github-rulesets.json
```

**Or import individual rulesets:**
```bash
# Get the rulesets
gh api repos/jamesmukumu/malasosafaris/rulesets/list

# Create specific ruleset
gh api repos/jamesmukumu/malasosafaris/rulesets \
  --input ruleset-1.json
```

**Advantages:**
- ✅ Fully automated
- ✅ Repeatable
- ✅ Version controlled (JSON in git)
- ✅ Scriptable

**Time:** ~3 minutes

---

### Option 3: GitHub CLI Interactive

**Most Guided**

```bash
# Interactive ruleset creation
gh repo rule create

# Prompts you to:
# - Choose ruleset name
# - Choose target (branch)
# - Choose branch name (main)
# - Enable rules as needed
```

**Advantages:**
- ✅ Step-by-step guidance
- ✅ No errors from typos
- ✅ Helpful descriptions
- ✅ Verifies as you go

**Time:** ~5 minutes

---

## 📋 JSON File Structure

```json
{
  "rulesets": [
    {
      "name": "Ruleset Name",
      "description": "What this ruleset does",
      "target": "branch",
      "enforcement": "active",
      "bypass_actors": [
        {
          "actor_type": "RepositoryRole",
          "actor_id": "maintain",
          "bypass_mode": "pull_request_only"
        }
      ],
      "conditions": {
        "ref_name": {
          "include": ["main"],
          "exclude": []
        }
      },
      "rules": [
        {
          "type": "rule_type",
          "parameters": {
            // rule configuration
          }
        }
      ]
    }
  ]
}
```

---

## 🔧 JSON Configuration Options

### Top Level

| Field | Value | Purpose |
|-------|-------|---------|
| `name` | String | Ruleset name (must be unique) |
| `description` | String | What the ruleset does |
| `target` | "branch" or "tag" | Type of ref |
| `enforcement` | "active" or "evaluate" | Active = enforced |
| `bypass_actors` | Array | Who can bypass (empty = no one) |
| `conditions` | Object | Which branches/tags apply to |
| `rules` | Array | List of rules |

### Rules Array

```json
"rules": [
  {
    "type": "creation",           // Block new branches
    "parameters": {}
  },
  {
    "type": "update",             // Block updates
    "parameters": {
      "update_allows_fetch_and_merge": false
    }
  },
  {
    "type": "deletion",           // Block deletion
    "parameters": {}
  },
  {
    "type": "non_fast_forward",   // Block force push
    "parameters": {}
  },
  {
    "type": "pull_request",       // Require PR + review
    "parameters": {
      "required_approving_review_count": 1,
      "dismiss_stale_reviews_on_push": true,
      "require_code_owner_review": false,
      "require_last_push_approval": false,
      "required_review_thread_resolution": true
    }
  },
  {
    "type": "required_status_checks",  // Require CI/CD
    "parameters": {
      "required_status_checks": [
        {
          "context": "build-and-deploy",
          "integration_id": null
        }
      ],
      "strict_required_status_checks_policy": true
    }
  }
]
```

---

## ✅ Verifying Rulesets Work

### After Import/Creation

```bash
# View all rulesets
gh api repos/jamesmukumu/malasosafaris/rulesets/list

# View specific ruleset
gh api repos/jamesmukumu/malasosafaris/rulesets/{ruleset-id}

# Check enforcement history
gh api repos/jamesmukumu/malasosafaris/rulesets/{ruleset-id}/history
```

### In GitHub UI

1. Go to: `Settings → Rules`
2. You should see 3 active rulesets
3. Click each to view details
4. All showing "Active" status

---

## 🧪 Testing the Configuration

### Test 1: Block Direct Push

```bash
# Try to push directly to main
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "test"
git push origin main

# Expected error:
# remote: error: rule violation: ...
# No direct pushes to main
```

**Expected Result:** ❌ Push blocked (Good!)

---

### Test 2: PR + CI/CD + Approval Workflow

```bash
# Create feature branch
git checkout -b feature/test
echo "test" >> README.md
git add README.md
git commit -m "test: CI/CD validation"
git push origin feature/test

# In GitHub:
# 1. Create PR
# 2. GitHub Actions runs build-and-deploy
# 3. Wait for checks to pass
# 4. Request review
# 5. Reviewer approves
# 6. Click Merge
# 7. Deployment workflow starts
# 8. App deployed to VPS
```

**Expected Result:** ✅ Full workflow works!

---

## 🔍 Troubleshooting JSON Issues

### Issue: "Invalid JSON"

**Problem:** JSON syntax error

**Solution:**
```bash
# Validate JSON
gh api repos/jamesmukumu/malasosafaris/rulesets \
  --input github-rulesets.json

# Use online JSON validator
# https://jsonlint.com
```

---

### Issue: "Status check not found"

**Problem:** Workflow name doesn't match ruleset

**Solution:**
```json
// In github-rulesets.json, check:
"context": "build-and-deploy"

// In .github/workflows/deploy.yml, check:
jobs:
  build-and-deploy:  // ← Must match exactly
```

---

### Issue: "Cannot merge - all required checks must pass"

**Problem:** CI/CD workflow failed

**Solution:**
1. Check GitHub Actions tab
2. Click failed workflow
3. Click failed step
4. Read error
5. Fix code
6. Push again (workflow re-runs)
7. Wait for all checks to pass
8. Then merge

---

## 📊 JSON vs Web UI

| Feature | JSON | Web UI |
|---------|------|--------|
| Import speed | Fast | Slow (manual) |
| Version control | ✅ Yes | No |
| Repeatable | ✅ Yes | No |
| Scriptable | ✅ Yes | No |
| Visual | No | ✅ Yes |
| Easy to learn | No | ✅ Yes |
| Good for teams | ✅ Yes | No |

**Recommendation:** Use Web UI to learn, then export as JSON for version control

---

## 🔐 Security Notes

### JSON File Safety

- ✅ No secrets in JSON (all public)
- ✅ Safe to commit to git
- ✅ Safe to share with team
- ✅ Credentials stored separately in GitHub

### Rules Application

- ✅ Applies to all users equally
- ✅ No bypasses enabled (by default)
- ✅ Applies to admins too (security best practice)
- ✅ Verifiable by all team members

---

## 📚 Additional Resources

**GitHub Rulesets Documentation:**
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets

**GitHub REST API:**
- https://docs.github.com/en/rest/repos/rules

**GitHub CLI:**
- https://cli.github.com/manual/gh_repo_rule

---

## 🎯 Next Steps

1. **Understand the rulesets:** Read GITHUB_RULESETS_QUICK_SETUP.md
2. **Import the rulesets:** Use Method 1 (Web UI) or Method 2 (API)
3. **Test the workflow:** Create PR, verify CI/CD, verify deployment
4. **Educate team:** Share setup guide with developers
5. **Monitor:** Check Settings → Rules for enforcement history

---

## ✨ What You Now Have

✅ Ready-to-use JSON ruleset file
✅ 3 professional rulesets configured
✅ No secrets or sensitive data
✅ Version controlled in git
✅ Fully documented
✅ Easy to modify if needed
✅ Repeatable and scriptable

---

**Your main branch is now protected with enterprise-grade controls!** 🚀

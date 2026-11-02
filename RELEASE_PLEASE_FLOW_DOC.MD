# 🚀 Release Please + GitFlow Workflow

This project uses **GitFlow** and **Google Release Please** GitHub Action to automate versioning, changelog generation, and GitHub releases.

---

## 🧭 GitFlow Overview

We follow the **GitFlow** branching model:

- **`develop`** — main development branch (all features are merged here)
- **`release/*`** — release preparation branches (e.g., `release/v1.2.0`)

Optional:
- **`feature/*`** — feature branches created from `develop` and merged back into it

---

## 🤖 How Release Please Works

The **Release Please** GitHub Action automates version bumps and changelog generation based on **Conventional Commits**.

**Example commits:**
feat: add user authentication
fix: correct typo in login page
chore: update dependencies


---

## ⚙️ Workflow Logic

**Workflow file:** `.github/workflows/release-please.yaml`

| Trigger | Action |
|----------|--------|
| Push to `develop` | Creates/updates a **Release PR** (no tag or GitHub release yet) |
| Push to `release/*` | Performs a **full release** — creates a tag, GitHub Release, and updates `CHANGELOG.md` |

**Config files:**
- `release-please-config.json` — defines release type, changelog path, etc.  
- `.release-please-manifest.json` — stores the current version.

---

## 🧩 Workflow Steps

1. Merge features into `develop`
2. When ready for release:
   ```bash
   git checkout develop
   git checkout -b release/v1.0.0
   git push origin release/v1.0.0
3.Release Please runs automatically:
    bumps version
    updates changelog
    creates GitHub Release + tag
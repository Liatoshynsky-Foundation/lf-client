# Development Workflow

This guide explains our development workflow based on GitFlow. It's designed to help both new and existing team members understand how we manage code changes.

## Why GitFlow?

- Clear separation of development and production code
- Organized feature development
- Controlled release process
- Emergency fixes without disrupting development

## Branch Overview

### Core Branches

| Branch    | Purpose                                                           |
| --------- | ----------------------------------------------------------------- |
| `main`    | Production-ready code, always stable                              |
| `develop` | Integration branch for features, contains latest development code |

### Supporting Branches

| Type      | Created from | Merged into          | Purpose                 |
| --------- | ------------ | -------------------- | ----------------------- |
| `feature` | `develop`    | `develop`            | New features            |
| `bugfix`  | `develop`    | `develop`            | Bug fixes               |
| `hotfix`  | `main`       | `main` and `develop` | Urgent production fixes |
| `release` | `develop`    | `main` and `develop` | Release preparation     |

## Branch Naming Rules

Format: `type/task-number/short-description`

Examples:

```text
feature/1234/add-new-feature
bugfix/23/fix-login-issue
hotfix/1235/critical-security-fix
release/1236/prepare-release
```

### Branch Types and When to Use Them

| Type      | When to Use                                                 |
| --------- | ----------------------------------------------------------- |
| `feature` | Developing new functionality                                |
| `bugfix`  | Fixing bugs found during development                        |
| `hotfix`  | Fixing critical issues in production                        |
| `release` | Preparing a new release (version bump, release notes, etc.) |

## Development Process

### 1. Starting Work

Always start from the correct base branch:

```bash
# For new features and bug fixes
git switch develop
git pull
git switch -c feature/1234/add-new-feature

# For hotfixes
git switch main
git pull
git switch -c hotfix/1235/critical-security-fix
```

### 2. Making Changes

- Make small, focused commits
- Follow our [commit message convention](conventional-commits.md)
- Keep your branch up to date with the base branch
- Test your changes thoroughly

### 3. Pushing Changes

```bash
git push -u origin feature/1234/add-new-feature
```

### 4. Creating Pull Requests

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select:
   - Base branch: `develop` (for features/bugfixes) or `main` (for hotfixes)
   - Compare branch: your feature branch
4. Add description following our PR template
5. Request review from team members

## Branch Protection Rules

To maintain code quality, we have the following protections:

### Main Branches

- No direct pushes allowed
- All changes must go through Pull Requests
- Required approvals: 2
- Required status checks:
  - Branch name validation
  - Commit message validation
  - Tests passing
  - Code coverage
  - Linting

### Feature Branches

- Branch name must follow convention
- Commit messages must follow convention
- Must be up to date with base branch before merge

## Automated Checks

We use automated tools to ensure code quality:

| Check              | Tool       | Purpose                          |
| ------------------ | ---------- | -------------------------------- |
| Branch name format | Husky      | Ensures consistent branch naming |
| Commit messages    | Commitlint | Validates commit message format  |
| Code style         | ESLint     | Enforces coding standards        |
| Tests              | Jest       | Ensures code works as expected   |
| Coverage           | Jest       | Ensures adequate test coverage   |

## Common Issues and Solutions

### Branch is Out of Date

```bash
git switch develop
git pull
git switch feature/1234/add-new-feature
git rebase develop
```

### Commit Message Rejected

Check our [commit message convention](conventional-commits.md) and try again.

### Tests Failing

1. Run tests locally: `npm test`
2. Fix failing tests
3. Push changes: `git push`

## Need Help?

1. Check our documentation:
   - [Commit Message Convention](conventional-commits.md)
   - [Project README](../README.md)
2. Ask in the team chat
3. Contact the project maintainers

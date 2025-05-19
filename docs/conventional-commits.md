# Commit Message Convention

This guide explains how to write commit messages in our project. Following these conventions helps maintain a clear and consistent commit history.

## Why Follow This Convention?

- Automatic generation of changelog
- Better understanding of changes
- Easier code review
- Automated version management

## Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                                         |
| ---------- | --------------------------------------------------- |
| `feat`     | A new feature                                       |
| `fix`      | A bug fix                                           |
| `docs`     | Documentation changes                               |
| `style`    | Code style changes (formatting, etc)                |
| `refactor` | Code changes that neither fix bugs nor add features |
| `perf`     | Performance improvements                            |
| `test`     | Adding or fixing tests                              |
| `build`    | Changes to build system or dependencies             |
| `ci`       | Changes to CI configuration                         |
| `chore`    | Other changes that don't modify src or test files   |
| `revert`   | Reverts a previous commit                           |

### Scopes

Scopes are optional and should be used to indicate which part of the codebase was affected:

```text
feat(auth): add OAuth2 authentication
fix(api): handle null response
docs(readme): update installation guide
```

Common scopes in our project:

- `auth` - Authentication related changes
- `api` - API endpoints and controllers
- `ui` - User interface components
- `db` - Database related changes
- `config` - Configuration changes

### Description

The description should:

- Be written in imperative mood ("Add feature" not "Added feature")
- Start with a capital letter
- Not end with a period
- Be concise but descriptive

## Examples

### Simple Commit

```text
feat(auth): add password reset functionality
```

### Commit with Issue Reference

```text
fix(api): handle null response from external service

Closes #123
```

### Breaking Change

```text
feat(api)!: remove deprecated endpoints

BREAKING CHANGE: The following endpoints are removed:
- GET /api/v1/users
- POST /api/v1/users
```

### Complex Change

```text
feat(auth): implement OAuth2 authentication

- Add Google OAuth2 provider
- Add GitHub OAuth2 provider
- Update user model to support OAuth
- Add OAuth configuration to env

Closes #123
Related to #456
```

## Common Mistakes

| ❌ Bad Example          | ✅ Good Example                                  |
| ----------------------- | ------------------------------------------------ |
| ❌ `Added new feature`  | ✅ `feat: add new feature`                       |
| ❌ `Added new feature`  | ✅ `feat: add new feature`                       |
| ❌ `fixed bug in login` | ✅ `fix(auth): handle null username in login`    |
| ❌ `update readme`      | ✅ `docs(readme): add installation instructions` |

## Validation

Your commit messages are automatically validated using [Husky](https://github.com/typicode/husky) and [commitlint](https://github.com/conventional-changelog/commitlint). If your commit message doesn't follow the convention, the commit will be rejected.

## Need Help?

If you're unsure about how to write a commit message:

1. Check the examples above
2. Ask in the team chat
3. Contact the project maintainers

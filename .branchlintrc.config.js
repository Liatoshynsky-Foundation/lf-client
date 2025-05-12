module.exports = {
  pattern: '^(feature|bugfix|hotfix|chore|release)/[0-9]+/[a-z0-9-]+$',

  examples: [
    'feature/1234/add-new-feature',
    'bugfix/23/fix-login-issue',
    'hotfix/1235/critical-security-fix',
    'release/1236/prepare-release',
  ],

  exclude: ['main', 'develop'],
};

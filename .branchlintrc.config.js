module.exports = {
  pattern: '^(feature|bugfix|chore|test)/[0-9]+/[a-z0-9]+(-[a-z0-9]+)*$|(hotfix|release)/[0-9]+\\.[0-9]+\\.[0-9]+$',

  examples: [
    'feature/1234/add-login-ui',
    'bugfix/23/fix-login-error',
    'chore/987/update-dependencies',
    'test/456/write-login-tests',
    'hotfix/1.0.1',
    'release/1.2.3'
  ],

  exclude: ['main', 'develop']
};

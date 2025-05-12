module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // A new feature
        'feat',
        // A bug fix
        'fix',
        // Documentation changes
        'docs',
        // Code style changes (formatting, etc)
        'style',
        // Code changes that neither fix bugs nor add features
        'refactor',
        // Performance improvements
        'perf',
        // Adding or fixing tests
        'test',
        // Changes to build system or dependencies
        'build',
        // Changes to CI configuration
        'ci',
        // Other changes that don't modify src or test files
        'chore',
        // Reverts a previous commit
        'revert',
      ],
    ],
  },
};

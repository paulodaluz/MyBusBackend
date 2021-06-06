module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'style', 'test', 'doc', 'env', 'build']],
  },
  'scope-case': [0],
};

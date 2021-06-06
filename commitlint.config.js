module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'style', 'test', 'doc', 'env', 'build']],
  },
  'type-case': 'lower-case',
  'header-max-length': 70
};

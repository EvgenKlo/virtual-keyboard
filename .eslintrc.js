module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'airbnb-base/legacy',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-param-reassign': 'off'
  }
};

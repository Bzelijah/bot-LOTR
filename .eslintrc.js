module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "quote-props": 0,
    "quotes": 0,
    "no-restricted-syntax": 0,
    "guard-for-in": 0,
    "prefer-template": 0,
    "no-useless-concat": 0,
    "prefer-const": 0,
    "arrow-parens": 0,
    "no-continue": 0,
  },
};

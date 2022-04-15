module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
  },
  rules: {'linebreak-style: ["error", "windows"]'}
};

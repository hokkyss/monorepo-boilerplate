/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@monorepo/eslint-config/expo', '@monorepo/eslint-config/json'],
  overrides: [
    {
      files: ['*.?(m)ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
    },
  ],
};

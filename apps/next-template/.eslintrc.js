/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@monorepo/eslint-config/next', '@monorepo/eslint-config/json'],
  ignorePatterns: ['prisma/zod'],
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

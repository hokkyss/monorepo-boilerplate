/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@monorepo/eslint-config/library', '@monorepo/eslint-config/json'],
  root: true,
  overrides: [
    {
      files: ['*.?(m)js?(x)', '*.?(m)ts?(x)'],
      parserOptions: {
        project: './tsconfig.lint.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
};

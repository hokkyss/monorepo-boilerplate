/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@monorepo/eslint-config/react', '@monorepo/eslint-config/json'],
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

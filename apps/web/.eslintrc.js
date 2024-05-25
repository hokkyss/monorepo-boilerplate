/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@monorepo/eslint-config/next"],
  overrides: [
    {
      files: ["*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: true,
      },
    },
  ],
};

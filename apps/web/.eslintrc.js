/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@monorepo/eslint-config/next", "@monorepo/eslint-config/json"],
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

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@monorepo/eslint-config/react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};

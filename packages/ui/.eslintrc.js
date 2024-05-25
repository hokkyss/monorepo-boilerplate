/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@monorepo/eslint-config/react", "@monorepo/eslint-config/json"],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
      parserOptions: {
        project: "./tsconfig.lint.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
};

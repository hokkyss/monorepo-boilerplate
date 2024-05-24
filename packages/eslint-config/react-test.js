/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: ['plugin:testing-library/react'],
      files: ['**/*.spec.ts?(x)', '**/*.spec.js?(x)'],
      plugins: ['testing-library'],
    },
  ],
};

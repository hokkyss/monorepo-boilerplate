/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      extends: ['plugin:testing-library/react'],
      files: ['*.(spec|test).?(m)[tj]s?(x)'],
      plugins: ['testing-library'],
    },
  ],
};

/** @type {import("eslint").Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['*.json'],
      extends: ['plugin:jsonc/recommended-with-json', 'plugin:jsonc/prettier'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/comma-style': 'error',
        'jsonc/no-comments': 'off',
        'jsonc/sort-keys': 'error',
      },
    },
    {
      files: ['package.json'],
      rules: {
        'jsonc/sort-keys': 'off',
      },
    },
  ],
};

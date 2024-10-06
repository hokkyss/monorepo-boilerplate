const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('./json'),
    require.resolve('./library'),
    require.resolve('./react'),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: [],
  settings: {},
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  overrides: [
    {
      files: ['*.?(m)[tj]s?(x)'],
      rules: {
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      },
    },
  ],
};

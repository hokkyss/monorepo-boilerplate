const { resolve } = require('node:path');
const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve('eslint-config-turbo'),
    require.resolve('./library'),
    require.resolve('./react-test'),
  ],
  plugins: [],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    {
      files: ['*.jsx', '*.tsx'],
      extends: [
        require.resolve('@vercel/style-guide/eslint/react'),
        'alloy/react',
      ],
    },
  ],
};

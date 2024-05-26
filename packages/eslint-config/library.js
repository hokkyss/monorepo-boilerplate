const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

const prettierConfig = require('./prettier.config');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended', require.resolve('eslint-config-turbo')],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  env: {
    node: true,
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {
      files: ['*'],
      extends: ['alloy', 'prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': ['error', prettierConfig, { usePrettierrc: false }],
        'no-console': 'error',
        'object-shorthand': 'error',
      },
    },
    {
      files: ['*.?(m)[jt]s?(x)'],
      extends: ['plugin:perfectionist/recommended-natural'],
      plugins: ['unused-imports'],
      rules: {
        'perfectionist/sort-classes': 'off',
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'side-effect',
              ['type', 'builtin-type', 'external-type'],
              'internal-type',
              'parent-type',
              'sibling-type',
              ['builtin', 'external'],
              'internal',
              'parent',
              'sibling',
              'unknown',
            ],
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': 'error',
      },
    },
    {
      files: ['*.?(m)ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        require.resolve('@vercel/style-guide/eslint/typescript'),
        'alloy/typescript',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};

require('@vercel/style-guide/eslint/typescript');
require('eslint-config-alloy/typescript');
require('eslint-config-alloy/base');
require('eslint-config-alloy/react');

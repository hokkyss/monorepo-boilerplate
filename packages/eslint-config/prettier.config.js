const alloyPrettier = require('eslint-config-alloy/.prettierrc');
const vercelPrettier = require('@vercel/style-guide/prettier');

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...vercelPrettier,
  ...alloyPrettier,
  plugins: [require.resolve('prettier-plugin-packagejson')],
  overrides: [
    ...(alloyPrettier.overrides ?? []),
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};

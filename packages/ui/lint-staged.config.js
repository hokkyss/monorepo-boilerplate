module.exports = {
  '*.{ts,tsx,js,jsx,json}': [(files) => `yarn lint -- ${files.join(' ')}`],
  '*.{ts,tsx,js,jsx}': [(files) => `yarn test -- ${files.join(' ')}`],
};

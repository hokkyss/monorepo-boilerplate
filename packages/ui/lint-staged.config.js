module.exports = {
  '*.{ts,tsx,js,jsx,json}': [() => 'turbo lint'],
  '*.{ts,tsx,js,jsx}': [() => 'turbo test'],
};

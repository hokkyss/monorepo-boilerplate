module.exports = {
  '*.{ts,js}': [() => `yarn lint`, () => `yarn test`],
};

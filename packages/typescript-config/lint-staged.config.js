/**
 * @typedef {string | (files: string[]) => string} Command
 */

/**
 * @type {Record<string, Command[]>}
 */
module.exports = {
  "*.json": [(files) => `yarn lint ${files.join(" ")}`],
};

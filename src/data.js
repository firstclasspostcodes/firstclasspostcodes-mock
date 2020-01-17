const { readFileSync } = require('fs');
const glob = require('glob');

const { DATA_PATH } = process.env;

const globOpts = {
  cwd: DATA_PATH,
  absolute: true,
};

const readAndParseJSON = (filepath) => JSON.parse(readFileSync(filepath, 'utf8'));

const files = glob.sync('**/*.json', globOpts);

const loaded = [].concat(...files.map(readAndParseJSON));

module.exports = loaded;

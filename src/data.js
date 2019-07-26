const fs = require('fs-extra');
const parse = require('csv-parse');
const glob = require('glob');
const { promisify } = require('util');

const { DATA_PATH } = process.env;

const globPromise = promisify(glob);

const parsePromise = promisify(parse);

const csvOpts = {
  columns: true,
};

const globOpts = {
  cwd: DATA_PATH,
  absolute: true,
};

const parseCSV = async filepath => parsePromise(await fs.readFile(filepath, 'utf8'), csvOpts);

module.exports = (async () => {
  const files = await globPromise('**/*.csv', globOpts);
  const listOfCsv = await Promise.all(files.map(parseCSV));
  return [].concat(...listOfCsv);
})();

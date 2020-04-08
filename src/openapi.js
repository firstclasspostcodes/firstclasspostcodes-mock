const fs = require('fs');
const path = require('path');

const getAutocomplete = require('./operations/getAutocomplete');
const getPostcode = require('./operations/getPostcode');
const getLookup = require('./operations/getLookup');

const { SPEC_FILE } = process.env;

const specification = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), SPEC_FILE), 'utf8'));

module.exports = {
  service: {
    getAutocomplete,
    getPostcode,
    getLookup,
  },
  specification,
  noAdditional: true,
};

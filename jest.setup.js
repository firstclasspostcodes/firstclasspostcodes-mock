const { matchersWithOptions } = require('jest-json-schema');

const { specification } = require('./src/openapi');

const ajvOptions = { verbose: true, removeAdditional: true };

expect.extend(matchersWithOptions(ajvOptions, (ajv) => {
  ajv.addSchema(specification, 'api');
}));

const fs = require('fs');
const path = require('path');

const openapi = require('./openapi');

const { SPEC_FILE } = process.env;

const specification = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), SPEC_FILE), 'utf8'));

const getOperationIds = () => {
  const { paths } = specification;
  return Object.values(paths).reduce((arr, method) => {
    const methods = Object.values(method).map((operation) => operation.operationId);
    return arr.concat(methods);
  }, []);
};

describe('openapi', () => {
  it('includes all methods', () => {
    const definedServiceOperations = Object.keys(openapi.service);
    expect(getOperationIds()).toEqual(expect.arrayContaining(definedServiceOperations));
  });
});

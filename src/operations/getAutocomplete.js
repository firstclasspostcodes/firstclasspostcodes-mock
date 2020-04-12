const search = require('../search');

const prepareJSON = (query, results = []) => {
  if (query.length < 2) {
    return [];
  }

  return results.map(({ postcode, streets }) => [postcode, streets]);
};

const get = (req, reply) => {
  const { search: query } = req.query;
  const results = search(query);
  const response = prepareJSON(query, results);
  reply.code(200);
  reply.type('application/json').send(JSON.stringify(response));
  return true;
};

module.exports = get;

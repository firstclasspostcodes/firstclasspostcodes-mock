const search = require('../search');

const prepareJSON = (query, results = []) => {
  const prepared = {
    roads: [],
    postcodes: [],
  };

  if (query.length < 2) {
    return prepared;
  }

  if (query.length < 4) {
    prepared.postcodes = results.map(((r) => r.sector));
    return prepared;
  }

  prepared.postcodes = results.map(((r) => r.postcode));

  results.forEach((result) => {
    result.streets.forEach((street) => {
      if (new RegExp(query, 'i').test(street) !== true) {
        return false;
      }

      const record = prepared.roads.find(([name]) => new RegExp(street, 'i').test(name));

      if (!record) {
        return prepared.roads.push([street, [result.postcode]]);
      }

      const [, postcodes] = record;

      return postcodes.push(result.postcode);
    });
  });

  return prepared;
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

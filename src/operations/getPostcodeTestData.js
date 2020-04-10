const data = require('../data');

module.exports = (request, reply) => {
  // reply.code(200);
  // reply.type('application/json').send(JSON.stringify(response));
  reply.send(data.map(({ postcode, latitude, longitude }) => ({
    postcode,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  })));
};

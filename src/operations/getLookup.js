const accepts = require('accepts');
const distance = require('@turf/distance').default;

const data = require('../data');

const TYPES = ['application/json', 'application/geo+json'];

const filterByDistance = (from, kilometers) => ({ latitude, longitude }) => {
  const to = [longitude, latitude];
  return distance(from, to, { unit: 'kilometers' }) <= kilometers;
};

const prepareJSON = (obj) => ({
  postcode: obj.postcode,
  position: {
    latitude: parseFloat(obj.latitude),
    longitude: parseFloat(obj.longitude),
  },
});

const prepareGeoJSON = (matches) => ({
  type: 'FeatureCollection',
  features: matches.map(({ postcode, latitude, longitude }) => ({
    type: 'Feature',
    properties: {
      type: 'Postcode',
      name: postcode,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(longitude),
        parseFloat(latitude),
      ],
    },
  })),
});

const get = (request, reply) => {
  const { latitude, longitude, radius: km = 5 } = request.query;

  const matches = data.filter(filterByDistance([longitude, latitude], km));

  if (matches.length === 0) {
    return reply.code(204).send();
  }

  reply.code(200);

  switch (accepts(request).type(TYPES)) {
    case 'application/geo+json':
      return reply.type('application/geo+json').send(JSON.stringify(prepareGeoJSON(matches)));
    default:
    case 'application/json':
      return reply.type('application/json').send(JSON.stringify(matches.map(prepareJSON)));
  }
};

module.exports = get;

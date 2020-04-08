const accepts = require('accepts');
const data = require('../data');

const TYPES = ['application/json', 'application/geo+json'];

const toId = (str) => Buffer.from(str.replace(/ /g, '').toLowerCase()).toString('base64');

const prepareJSON = (obj) => ({
  streets: obj.streets,
  numbers: obj.numbers,
  postcode: obj.postcode,
  district: obj.district,
  sector: obj.sector,
  area: obj.area,
  inward: obj.inward,
  city: obj.city,
  locality: obj.locality,
  ward: obj.ward,
  constituency: obj.constituency,
  county: obj.county,
  region: obj.region,
  country: obj.country,
  position: {
    geohash: obj.georange,
    easting: obj.easting,
    northing: obj.northing,
    latitude: parseFloat(obj.latitude),
    longitude: parseFloat(obj.longitude),
  },
});

const prepareGeoJSON = (obj) => ({
  type: 'FeatureCollection',
  features: [
    ...obj.numbers.map(({ number, building, street }) => ({
      type: 'Feature',
      properties: {
        type: 'StreetAddress',
        name: [number, building, street].filter(Boolean).join(' '),
        number,
        building,
        street,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(obj.longitude),
          parseFloat(obj.latitude),
        ],
      },
    })),
    {
      type: 'Feature',
      properties: {
        type: 'Postcode',
        name: obj.postcode,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(obj.longitude),
          parseFloat(obj.latitude),
        ],
      },
    },
  ],
});

const get = (request, reply) => {
  const searchId = toId(request.query.search);

  const match = data.find(({ id }) => id === searchId);

  if (!match) {
    return reply.code(204).send();
  }

  reply.code(200);

  switch (accepts(request).type(TYPES)) {
    case 'application/geo+json':
      return reply.type('application/geo+json').send(JSON.stringify(prepareGeoJSON(match)));
    default:
    case 'application/json':
      return reply.type('application/json').send(JSON.stringify(prepareJSON(match)));
  }
};

module.exports = get;

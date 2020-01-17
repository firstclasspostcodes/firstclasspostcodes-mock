const accepts = require('accepts');
const data = require('../data');

const TYPES = ['application/json', 'application/geo+json'];

const toId = str => Buffer.from(str.replace(/ /g, '').toLowerCase()).toString('base64');

const prepareJSON = obj => ({
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

const prepareGeoJSON = obj => ({
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

const get = (req, res) => {
  const searchId = toId(req.query.search);
  const match = data.find(({ id }) => id === searchId);
  if (!match) {
    return res.status(204).json({});
  }
  res.status(200);

  switch (accepts(req).type(TYPES)) {
    case 'application/geo+json':
      res.setHeader('Content-Type', 'application/geo+json');
      return res.json(prepareGeoJSON(match));
    default:
    case 'application/json':
      res.setHeader('Content-Type', 'application/json');
      return res.json(prepareJSON(match));
  }
};

module.exports = {
  get,
};

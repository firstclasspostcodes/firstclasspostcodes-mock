const accepts = require('accepts');
const geolib = require('geolib');
const data = require('../data');

const TYPES = ['application/json', 'application/geo+json'];

const filterByDistance = (position, meters) => ({ latitude, longitude }) => {
  const distance = geolib.getDistance(position, { latitude, longitude });
  return distance <= meters;
};

const prepareJSON = obj => ({
  postcode: obj.postcode,
  position: {
    latitude: parseFloat(obj.latitude),
    longitude: parseFloat(obj.longitude),
  },
});

const prepareGeoJSON = matches => ({
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

const get = async (req, res) => {
  const { latitude, longitude, radius: km } = req.query;
  const matches = data.filter(filterByDistance({ latitude, longitude }, km * 100));
  if (matches.length === 0) {
    return res.status(204).json([]);
  }
  res.status(200);

  switch (accepts(req).type(TYPES)) {
    case 'application/geo+json':
      res.setHeader('Content-Type', 'application/geo+json');
      return res.json(prepareGeoJSON(matches));
    default:
    case 'application/json':
      res.setHeader('Content-Type', 'application/json');
      return res.json(matches.map(prepareJSON));
  }
};

module.exports = {
  get,
};

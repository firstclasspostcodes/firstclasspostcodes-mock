const data = require('../data');

const geolib = require('geolib');

const filterByDistance = (position, meters) => ({ latitude, longitude }) => {
  const distance = geolib.getDistance(position, { latitude, longitude });
  return distance <= meters;
};

const prepareJSON = (obj) => ({
  postcode: obj.postcode,
  position: {
    latitude: obj.latitude,
    longitude: obj.longitude,
  },
});

const get = async (req, res) => {
  const prepared = await data;
  const { latitude, longitude, radius: km } = req.query;
  const matches = prepared.filter(filterByDistance({ latitude, longitude }, km * 100));
  if (matches.length === 0) {
    return res.status(204).json([]);
  }
  return res.status(200).json(matches.map(prepareJSON));
};

module.exports = {
  get,
};
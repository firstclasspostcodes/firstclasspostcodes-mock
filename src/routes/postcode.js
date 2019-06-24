const data = require('../data');

const toId = (str) => Buffer.from(str.replace(/ /g, '').toLowerCase()).toString('base64');

const prepareJSON = ({ numbers = [], ...obj }) => ({
  street: obj.street,
  numbers: numbers.split(','),
  city: obj.city,
  district: obj.district,
  county: obj.county,
  postcode: obj.postcode,
  country: obj.country,
  position: {
    easting: obj.easting,
    northing: obj.northing,
    latitude: obj.latitude ? parseFloat(obj.latitude) : null,
    longitude: obj.longitude ? parseFloat(obj.longitude) : null,
  },
});

const get = async (req, res) => {
  const id = toId(req.query.search);
  const prepared = await data;
  const [match] = prepared.filter((obj) => toId(obj.postcode) === id);
  if (!match) {
    return res.status(204).json({});
  }
  return res.status(200).json(prepareJSON(match));
};

module.exports = {
  get,
};
const search = require('../search');

const get = async (req, res) => {
  const { search: query } = req.query;
  const term = query.split(' ').map(t => `+${t}`).join(' ');
  const results = search.search(term);
  const response = results.map(({ ref }) => JSON.parse(ref));
  return res.status(200).json(response);
};

module.exports = {
  get,
};

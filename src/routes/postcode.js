const get = (req, res) => {
  return res.status(200).json({
    hello: 'test',
  });
};

module.exports = {
  get,
};
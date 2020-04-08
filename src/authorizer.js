const authorizer = (req, res, done) => {
  const { 'x-api-key': key } = req.headers;
  if (!key) {
    return res.code(403).send('Missing X-Api-Key header in request');
  }
  if (key !== '111111111111') {
    return res.code(403).send(`Invalid API Key "${key}" should be "111111111111"`);
  }
  return done();
};

module.exports = authorizer;

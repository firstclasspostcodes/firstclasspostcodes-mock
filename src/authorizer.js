const DATA_PATH = /\/data\/\..+/;

const authorizer = (req, reply, done) => {
  if (DATA_PATH.test(req.raw.url)) {
    return done();
  }

  const { 'x-api-key': key } = req.headers;

  if (!key) {
    return reply.code(403).send('Missing X-Api-Key header in request');
  }

  if (key !== '111111111111') {
    return reply.code(403).send(`Invalid API Key "${key}" should be "111111111111"`);
  }

  return done();
};

module.exports = authorizer;

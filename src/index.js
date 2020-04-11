const fastify = require('fastify');
const cors = require('fastify-cors');
const glue = require('fastify-openapi-glue');

const { ADDRESS = '127.0.01', PORT } = process.env;

const openapi = require('./openapi');
const authorizer = require('./authorizer');
const getPostcodeTestData = require('./operations/getPostcodeTestData');

const server = fastify({
  logger: true,
});

server.register(cors, { origin: true });

server.addHook('onRequest', authorizer);

server.register(glue, openapi);

server.get('/data/.postcodes', getPostcodeTestData);

const start = async () => {
  try {
    await server.listen(PORT, ADDRESS);
    server.log.info(`server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

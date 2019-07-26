const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const openapi = require('express-openapi');
const path = require('path');
const cors = require('cors');

const authorizer = require('./authorizer');

const { PORT, SPEC_FILE } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());

openapi.initialize({
  apiDoc: fs.readFileSync(path.resolve(process.cwd(), SPEC_FILE), 'utf8'),
  promiseMode: true,
  paths: path.resolve(__dirname, 'routes'),
  app,
  securityHandlers: {
    Authorizer: authorizer,
  },
  operations: {
    getSpecification: (req, res) => res.status(204),
  },
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

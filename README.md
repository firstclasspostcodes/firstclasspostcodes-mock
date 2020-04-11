# 🔀 API Mock

![Build, test and release](https://github.com/firstclasspostcodes/firstclasspostcodes-mock/workflows/Build,%20test%20and%20release/badge.svg)

A HTTP mock server that responds like the real Firstclasspostcodes API. It is intended for use by clients integrating with our API, in order to improve integration testing and to ensure tests are less brittle.

To get started using the API, [read the docs](https://docs.firstclasspostcodes.com).

We provide clients in [Ruby](https://github.com/firstclasspostcodes/firstclasspostcodes-ruby), [PHP](https://github.com/firstclasspostcodes/firstclasspostcodes-php), [Javascript/NodeJS](https://github.com/firstclasspostcodes/firstclasspostcodes-js), [Python](https://github.com/firstclasspostcodes/firstclasspostcodes-python). To configure the client libraries to connect to this mock API, view the relevant library documentation.

## Usage

A docker container is provided for ease of use:

```sh
docker run -p 80:2345 firstclasspostcodes/mock:v4.0.4.
```

Now start calling the Firstclasspostcodes API:

```
curl -H 'X-Api-Key:111111111111' http://localhost:2345/postcode?search=AR514UI
```

### API Key

The API Key is **always** `111111111111`. If an API Key is not provided, `403` response is returned. 

## Data

A small set of test data is available for querying through the mock API. A special endpoint is provided `GET: /data/.postcodes` which will list all postcodes currently provided for testing purposes.

Whilst the test data is sourced from our live API, it may not be in sync with updates.

> Note: Additional postcodes will be added in **major releases**.

## Local Development

This is a node project, so first run `npm i` to fetch all the project dependencies. You'll also need a local version of the OpenAPI specification file to work with:

```
curl -o spec.json https://api.firstclasspostcodes.com/data/.spec
```

Running `npm start` will boot up the server. 
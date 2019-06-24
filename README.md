# 🔀 API Mock

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Build Status](https://travis-ci.org/firstclasspostcodes/firstclasspostcodes-mock.svg?branch=master)](https://travis-ci.org/firstclasspostcodes/firstclasspostcodes-mock) [![](https://images.microbadger.com/badges/image/firstclasspostcodes/mock.svg)](https://microbadger.com/images/firstclasspostcodes/mock "Docker Image") [![](https://images.microbadger.com/badges/version/firstclasspostcodes/mock.svg)](https://microbadger.com/images/firstclasspostcodes/mock "Docker Version")

A HTTP mock server that responds like the real Firstclasspostcodes API. It is intended for use by clients integrating with our API, in order to improve integration testing and to ensure tests are less brittle.

To get started using the API, [read the docs](https://docs.firstclasspostcodes.com).

We also provide clients in [Ruby](https://github.com/firstclasspostcodes/firstclasspostcodes-ruby), [Java](https://github.com/firstclasspostcodes/firstclasspostcodes-java), [Javascript/NodeJS](https://github.com/firstclasspostcodes/firstclasspostcodes-js), [Python](https://github.com/firstclasspostcodes/firstclasspostcodes-python) and libraries for [React](https://github.com/firstclasspostcodes/react-postcode-lookup), [Vue](https://github.com/firstclasspostcodes/vue-postcode-lookup), [Angular](https://github.com/firstclasspostcodes/angular-postcode-lookup) and [Web Components](https://github.com/firstclasspostcodes/web-components-postcode-lookup).

## Usage

A docker container is provided for ease of use:

```sh
docker run -p 80:2345 firstclasspostcodes/mock
```

Now start calling the Firstclasspostcodes API:

```
curl -H 'X-Api-Key:111111111111' http://localhost:2345/postcode?search=AR514UI
```

### API Key

The API Key is **always** `111111111111`. If an API Key is not provided, `403` response is returned. 

## Data

A small set of test data is available for querying through the mock API. See [test data](/DATA.md) for the complete list. 

Whilst the test data is sourced from our live API, it may not be in sync with updates.

> Note: Additional postcodes will be added in **major releases**.

## Local Development

This is a node project, so first run `npm i` to fetch all the project dependencies. You'll also need a local version of the OpenAPI specification file to work with:

```
curl -o spec.json https://api.firstclasspostcodes.com/data/.spec
```

Running `npm start` will boot up the server. 

---

<center><p><img src="data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzMjJweCIgaGVpZ2h0PSIzMjJweCIgdmlld0JveD0iLTAuNSAtMC41IDMyMiAzMjIiPjxkZWZzLz48Zz48ZWxsaXBzZSBjeD0iMTYwIiBjeT0iMTYwIiByeD0iMTYwIiByeT0iMTYwIiBmaWxsPSIjMjI4ZmNmIiBzdHJva2U9Im5vbmUiIHBvaW50ZXItZXZlbnRzPSJub25lIi8+PHBhdGggZD0iTSA2MCAxNDAgTCAxMTAgMTQwIEwgMTMwIDE2MCBMIDExMCAxODAgTCA2MCAxODAgTCA4MCAxNjAgWiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsOTUsMTYwKSIgcG9pbnRlci1ldmVudHM9Im5vbmUiLz48cmVjdCB4PSI4MCIgeT0iMTQwIiB3aWR0aD0iNTAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgcG9pbnRlci1ldmVudHM9Im5vbmUiLz48cmVjdCB4PSIxNDAiIHk9IjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHBvaW50ZXItZXZlbnRzPSJub25lIi8+PHBhdGggZD0iTSAxMzkuNSA5MCBMIDIzOS41IDkwIEwgMjU5LjUgMTEwIEwgMjM5LjUgMTMwIEwgMTM5LjUgMTMwIEwgMTU5LjUgMTEwIFoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgcG9pbnRlci1ldmVudHM9Im5vbmUiLz48L2c+PC9zdmc+" height="80" width="80"></p></center>
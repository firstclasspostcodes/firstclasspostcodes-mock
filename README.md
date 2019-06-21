# 🔀 API Mock

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
curl -H 'X-Api-Key:111111111111' http://localhost:2345/postcode?search=AR517FG
```

### API Key

The API Key is **always** `111111111111`. If an API Key is not provided, `403` response is returned. 

## Data

A fake set of data is provided with postcodes all beginning with `AR51` (Area 51 👽). The provided set of inward postcodes are below. 

> Note: Additional inward codes will be added in **major releases**.

| Inward Code | Latitude | Longitude |
|-------------|:--------:|:---------:|
| `1SD` | `48.97567` | `-15.34236` |
| `2BN` | `48.97206` | `-14.64586` |
| `3VB` | `48.97415` | `-13.94988` |
| `4UI` | `49.0009` | `-13.333` |
| `5NM` | `48.98497` | `-12.61779` |
| `6SA` | `48.98545` | `-11.21787` |
| `7DD` | `49.38859` | `-13.94823` |
| `8LX` | `49.8406` | `-13.9471` |
| `9OP` | `48.51565` | `-13.95922` |

## Local Development

This is a node project, so first run `npm i` to fetch all the project dependencies. You'll also need a local version of the OpenAPI specification file to work with:

```
curl -o spec.json https://api.firstclasspostcodes.com/data/.spec
```

Running `npm start` will boot up the server. 
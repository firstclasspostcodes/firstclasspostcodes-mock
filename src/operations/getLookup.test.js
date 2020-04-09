const data = require('../data');

const getLookup = require('./getLookup');

const getRandomData = () => data[Math.floor(Math.random() * data.length)];

const setupMockReply = () => {
  const reply = {
    code: jest.fn().mockImplementation(() => reply),
    type: jest.fn().mockImplementation(() => reply),
    send: jest.fn().mockImplementation((response) => {
      try {
        reply.responseBody = JSON.parse(response);
      } catch (e) {
        reply.responseBody = response;
      }
      return reply;
    }),
  };

  return reply;
};

const responseSchema = { $ref: 'api#/definitions/Points' };

describe('#getLookup', () => {
  let fixture;

  let reply;

  let request;

  beforeEach(() => {
    fixture = getRandomData();
    reply = setupMockReply();
  });

  describe('when the location has a match', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          latitude: fixture.latitude,
          longitude: fixture.longitude,
        },
      };
    });

    it('responds with the postcode', () => {
      getLookup(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.postcode));
      expect(reply.responseBody).toMatchSchema(responseSchema);
    });

    describe('when geoJSON data is requested', () => {
      beforeEach(() => {
        request.headers.accept = 'application/geo+json';
      });

      it('responds with the correctly formatted data', () => {
        getLookup(request, reply);
        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.type).toHaveBeenCalledWith('application/geo+json');
        expect(reply.send).toHaveBeenCalledWith(expect.stringContaining('FeatureCollection'));
        expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.postcode));
      });
    });
  });

  describe('when the location has no matches', () => {
    // ...somewhere in the middle of the pacific
    const position = {
      latitude: 0.0000,
      longitude: -160.0000,
    };

    beforeEach(() => {
      request = {
        headers: {},
        query: {
          ...position,
        },
      };
    });

    it('responds with 204 (no content)', () => {
      getLookup(request, reply);
      expect(reply.code).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalledTimes(1);
    });
  });
});

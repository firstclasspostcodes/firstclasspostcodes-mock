const data = require('../data');

const getPostcode = require('./getPostcode');

const getRandomData = () => data[Math.floor(Math.random() * data.length)];

const setupMockReply = () => {
  const reply = {
    code: jest.fn().mockImplementation(() => reply),
    send: jest.fn().mockImplementation(() => reply),
    type: jest.fn().mockImplementation(() => reply),
  };
  return reply;
};

describe('#getPostcode', () => {
  let fixture;

  let reply;

  let request;

  beforeEach(() => {
    fixture = getRandomData();
    reply = setupMockReply();
  });

  describe('when the postcode does exist', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: fixture.postcode.replace(' ', '').toLowerCase(),
        },
      };
    });

    it('responds with the correct data', () => {
      getPostcode(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.postcode));
    });

    describe('when geoJSON data is requested', () => {
      beforeEach(() => {
        request.headers.accept = 'application/geo+json';
      });

      it('responds with the correctly formatted data', () => {
        getPostcode(request, reply);
        expect(reply.code).toHaveBeenCalledWith(200);
        expect(reply.type).toHaveBeenCalledWith('application/geo+json');
        expect(reply.send).toHaveBeenCalledWith(expect.stringContaining('FeatureCollection'));
        expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.postcode));
      });
    });
  });

  describe('when the postcode does not exist', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: '23456yuhgfde',
        },
      };
    });

    it('responds with 204 (no content)', () => {
      getPostcode(request, reply);
      expect(reply.code).toHaveBeenCalledWith(204);
      expect(reply.send).toHaveBeenCalledTimes(1);
    });
  });
});

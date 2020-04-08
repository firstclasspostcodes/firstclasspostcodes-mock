const data = require('../data');

const getAutocomplete = require('./getAutocomplete');

const getRandomData = () => data[Math.floor(Math.random() * data.length)];

const setupMockReply = () => {
  const reply = {
    code: jest.fn().mockImplementation(() => reply),
    send: jest.fn().mockImplementation(() => reply),
    type: jest.fn().mockImplementation(() => reply),
  };
  return reply;
};

describe('#getAutocomplete', () => {
  let fixture;

  let reply;

  let request;

  const emptyResponseBody = JSON.stringify({
    roads: [],
    postcodes: [],
  });

  beforeEach(() => {
    fixture = getRandomData();
    reply = setupMockReply();
  });

  describe('when the query is only 1 character', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: 'A',
        },
      };
    });

    it('responds with no matching results', () => {
      getAutocomplete(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(emptyResponseBody);
    });
  });

  describe('when the query is only 4 characters', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: fixture.postcode.slice(0, 4),
        },
      };
    });

    it('responds with matching results', () => {
      getAutocomplete(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.sector));
    });
  });

  describe('when there is a match', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: fixture.postcode.slice(0, -1),
        },
      };
    });

    it('responds with matching results', () => {
      getAutocomplete(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(expect.stringContaining(fixture.postcode));
    });
  });

  describe('when no data matches', () => {
    beforeEach(() => {
      request = {
        headers: {},
        query: {
          search: '23456yujhgfde',
        },
      };
    });

    it('responds with no matching results', () => {
      getAutocomplete(request, reply);
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.type).toHaveBeenCalledWith('application/json');
      expect(reply.send).toHaveBeenCalledWith(emptyResponseBody);
    });
  });
});

const getPostcodeTestData = require('./getPostcodeTestData');

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

const responseSchema = {
  type: 'array',
  items: {
    type: 'object',
    required: [
      'postcode',
      'latitude',
      'longitude',
    ],
    properties: {
      postcode: {
        type: 'string',
      },
      latitude: {
        type: 'number',
      },
      longitude: {
        type: 'number',
      },
    },
  },
};

describe('#getPostcodeTestData', () => {
  let reply;

  beforeEach(() => {
    reply = setupMockReply();
  });

  it('responds with the correct data', () => {
    getPostcodeTestData({}, reply);
    expect(reply.responseBody).toMatchSchema(responseSchema);
  });
});

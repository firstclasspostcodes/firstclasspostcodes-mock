const authorizer = require('./authorizer');

const setupMockReply = () => {
  const reply = {
    code: jest.fn().mockImplementation(() => reply),
    send: jest.fn().mockImplementation(() => reply),
  };
  return reply;
};

describe('#authorizer', () => {
  let done;

  let reply;

  let request;

  const defaultRequest = {
    headers: {},
    raw: {
      url: '/',
    },
  };

  beforeEach(() => {
    done = jest.fn();
    reply = setupMockReply();
  });

  describe('when the route is not authenticated', () => {
    beforeEach(() => {
      request = {
        ...defaultRequest,
        raw: {
          url: '/data/.hidden-path',
        },
      };
    });

    it('calls done and proceeds', () => {
      authorizer(request, reply, done);
      expect(done).toHaveBeenCalledTimes(1);
      expect(reply.code).not.toHaveBeenCalled();
      expect(reply.send).not.toHaveBeenCalled();
    });
  });

  describe('when x-api-key is not set', () => {
    beforeEach(() => {
      request = { ...defaultRequest };
    });

    it('returns a 4XX status code', () => {
      authorizer(request, reply, done);
      expect(done).not.toHaveBeenCalled();
      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('when x-api-key is set', () => {
    describe('when the value is invalid', () => {
      beforeEach(() => {
        request = {
          ...defaultRequest,
          headers: {
            'x-api-key': '234567876543',
          },
        };
      });

      it('returns a 4XX status code', () => {
        authorizer(request, reply, done);
        expect(done).not.toHaveBeenCalled();
        expect(reply.code).toHaveBeenCalledWith(403);
        expect(reply.send).toHaveBeenCalledWith(expect.any(String));
      });
    });

    describe('when the value is valid', () => {
      beforeEach(() => {
        request = {
          ...defaultRequest,
          headers: {
            'x-api-key': '111111111111',
          },
        };
      });

      it('calls done and proceeds', () => {
        authorizer(request, reply, done);
        expect(done).toHaveBeenCalledTimes(1);
        expect(reply.code).not.toHaveBeenCalled();
        expect(reply.send).not.toHaveBeenCalled();
      });
    });
  });
});

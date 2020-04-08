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

  beforeEach(() => {
    done = jest.fn();
    reply = setupMockReply();
  });

  describe('when x-api-key is not set', () => {
    beforeEach(() => {
      request = { headers: {} };
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

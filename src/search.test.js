const data = require('./data');

const search = require('./search');

const getRandomData = () => data[Math.floor(Math.random() * data.length)];

describe('#search', () => {
  it('is a function', () => {
    expect(search).toBeInstanceOf(Function);
  });

  describe('when the search is invalid', () => {
    it('returns an empty object', () => {
      expect(search('w23456yujhbgvfdsw')).toHaveLength(0);
    });
  });

  describe('when the search is a postcode', () => {
    let postcode;

    beforeEach(() => {
      postcode = getRandomData().postcode;
    });

    it('returns a matching object', () => {
      expect(search(postcode)).toHaveLength(1);
    });
  });

  describe('when the search is a road', () => {
    let street;

    beforeEach(() => {
      while (!street) {
        const { streets } = getRandomData();
        [street] = streets;
      }
    });

    it('returns a matching object', () => {
      expect(search(street)).toHaveLength(1);
    });
  });
});

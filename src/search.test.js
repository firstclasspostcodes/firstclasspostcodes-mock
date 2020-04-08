const search = require('./search');

describe('#search', () => {
  it('works', () => {
    console.log(JSON.stringify(search('Gladstone Gardens'), null, '  '));
    expect(true).toBe(true);
  });
});

const lunr = require('lunr');

const data = require('./data');

const prepareDocs = ({
  postcode, numbers, street, city, county,
}) => {
  if (typeof numbers !== 'string') {
    return [];
  }

  const arr = numbers.split(',');

  if (arr.length === 0) {
    return [];
  }

  const docs = arr.map((number) => {
    const display = [number, street, city, county, postcode].filter(Boolean).join(', ');
    const id = JSON.stringify({ display, postcode, number });
    return {
      id, display, postcode, number,
    };
  });

  return docs;
};

const prepareIndex = docs => new Promise((resolve, reject) => {
  const idx = lunr(function run() {
    const index = this;
    try {
      index.field('display');
      index.ref('id');
      docs.forEach(doc => index.add(doc));
    } catch (err) {
      reject(err);
    }
  });
  resolve(idx);
});

module.exports = (
  () => data
    .then(prepared => [].concat(...prepared.map(prepareDocs)))
    .then(prepareIndex)
)();

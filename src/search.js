const lunr = require('lunr');

const data = require('./data');

const prepareDocs = ({ postcode, streets }) => (
  streets.map((street) => {
    const display = [street, postcode].filter(Boolean).join(', ');
    const id = JSON.stringify({ street, postcode });
    return {
      id, display, postcode, street,
    };
  })
);

const prepareIndex = (docs) => lunr(function run() {
  const index = this;
  index.field('display');
  index.ref('id');
  docs.forEach((doc) => index.add(doc));
});

const prepared = [].concat(...data.map(prepareDocs));

module.exports = prepareIndex(prepared);

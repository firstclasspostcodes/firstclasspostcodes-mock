const JsSearch = require('js-search');

const data = require('./data');

const search = new JsSearch.Search('id');

search.indexStrategy = new JsSearch.PrefixIndexStrategy();

search.addIndex('streets');

search.addIndex('postcode');

search.addDocuments(data);

module.exports = (term) => search.search(term);

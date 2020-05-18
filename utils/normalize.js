const _ = require('lodash');

const toStartCase = (value) => _.startCase(value);

const normalize = (objNormalize) => _.mapValues(objNormalize, toStartCase);

module.exports = { normalize };

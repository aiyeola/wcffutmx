const _ = require('lodash');

const toStartCase = (value) => _.startCase(value);
const toANumber = (value) => _.toNumber(value);

const normalize = (objNormalize) => _.mapValues(objNormalize, toStartCase);
const numberize = (objNumberize) => _.mapValues(objNumberize, toANumber);

module.exports = { normalize, numberize };

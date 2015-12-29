'use strict';

// side-effect
require('should');
require('should-sinon');

module.exports = {
    TEST_ROOT: __dirname,
    Promise: require('bluebird'),
    sinon: require('sinon'),
};

'use strict';

var Promise = require('./promise');

var util = exports;

exports.once = function(func) {
    var called = false;
    var result;
    return function() {
        if (called) return result;
        called = true;
        result = func.apply(this, arguments);
        return result;
    };
};

exports.isPromise = function(value) {
    if (!value) return false;
    return typeof value.then === 'function';
};

exports.returnOrCallback = function(func) {
    var oneHour = 3600000;
    var returnedPromise;
    var callbackPromise = new Promise(function(resolve, reject) {
        returnedPromise = func(function(err) {
            if (err) return reject(err);
            resolve(true);
        });
    }).timeout(oneHour, 'callback has not been invoked in one hour!');

    var result;
    if (returnedPromise === undefined) {
        result = callbackPromise;
    } else {
        callbackPromise.cancel();

        if (util.isPromise(returnedPromise)) {
            result = returnedPromise;
        } else {
            result = Promise.resolve(returnedPromise);
        }
    }
    return result;
};

'use strict';

var Promise = require('./promise');

var util = exports;

exports.emtpyCallback = function() {};

exports.isFunction = function(value) {
    return typeof value === 'function';
};

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
    var returnedPromise;
    var callbackPromise = new Promise(function(resolve, reject) {
        returnedPromise = func(function(err) {
            if (err) return reject(err);
            resolve(true);
        });
    });

    var promise;
    if (util.isPromise(returnedPromise)) {
        promise = returnedPromise;
        callbackPromise.cancel();
    } else {
        promise = callbackPromise;
    }
    return promise;
};

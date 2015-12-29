'use strict';

var util = require('./util');
var Promise = require('./promise');

/**
 * @private
 * @method idle
 * @return {true}
 */
var idle = function() {return true;};

/**
 * @class Module
 *
 * @constructor
 * @param {Object} [options]
 * @param {Function} [options.init=idle]
 * @param {Function} [options.start=idle]
 * @param {Function} [options.stop=idle]
 * @param {Function} [options.exit=idle]
 */
function Module(options) {
    var module = this;
    options = options || {};

    /**
     * Whether the module is initialized.
     * @property {Boolean} [initialized=false]
     */
    module.initialized = false;
    /**
     * Whether the module is running.
     * @property {Boolean} [running=false]
     */
    module.running = false;

    ['init', 'start', 'stop', 'exit'].forEach(function(name) {
        var method = options[name];
        if (method) {
            var setMethod = 'set' + name[0].toUpperCase() + name.slice(1) + 'Method';
            module[setMethod](method);
        }
    });
}

Module.prototype.setInitMethod = function(method) {
    if (typeof method !== 'function') throw new Error('The method must be a Function!');
    this._init = method;
};

Module.prototype.setStartMethod = function(method) {
    if (typeof method !== 'function') throw new Error('The method must be a Function!');
    this._start = method;
};

Module.prototype.setStopMethod = function(method) {
    if (typeof method !== 'function') throw new Error('The method must be a Function!');
    this._stop = method;
};

Module.prototype.setExitMethod = function(method) {
    if (typeof method !== 'function') throw new Error('The method must be a Function!');
    this._exit = method;
};

/**
 * Implement your business codes to initialize this module.
 *
 * @template
 * @protected
 * @throws  Throw an error if any exception occurs.
 * @method _init
 * @param  {Function} [callback]
 * @param  {Error} [callback.err]
 * @return {Boolean|Promise.<Boolean|Error>}  Whether the module is initialized successfully or not
 */
Module.prototype._init = idle;

/**
 * initialize the module
 *
 * @method init
 * @param  {Function} [callback=undefined]
 * @param  {Error} [callback.err]
 * @return {undefined|Promise.<true|Error>}
 * If callback is provided, return undefined, and error will be delivered by callback.
 * Otherwise, return a promise, which fulfilled with true if no exception occurs or rejected with an error.
 */
Module.prototype.init = function init(callback) {
    var module = this;
    if (module.initialized === true) return Promise.resolve(true);

    var promise = Promise.resolve()
        .then(function() {
            return util.returnOrCallback(function(callback) {
                return module._init(callback);
            });
        })
        .then(function(initialized) {
            if (initialized === true) {
                module.initialized = initialized;
                if (util.isFunction(callback)) callback();
                return initialized;
            } else if (initialized === false) {
                return Promise.reject(new Error('module._init failed'));
            } else {
                return Promise.reject(new Error('The value returned from module._init is not a boolean!'));
            }
        });

    if (util.isFunction(callback)) {
        promise.catch(callback);
        return undefined;
    } else {
        return promise;
    }
};

/**
 * Implement your business codes to start this module.
 *
 * @template
 * @protected
 * @throws  Throw an error if any exception occurs.
 * @method _start
 * @param  {Function} callback
 * @param  {Error} [callback.err]
 * @return {Boolean|Promise.<Boolean>}  Whether the module is started successfully or not
 */
Module.prototype._start = idle;

/**
 * initialize and start
 *
 * This method return a promise indicating whether started successfully or not.
 * If any error occurs in this period, the callback(err) will be invoked first,
 * and then the promise will be fulfilled with `false`.
 * So the promise never be rejected with an error.
 *
 * @throws {Error} Throw error if `module.init()` return false.
 *
 * @method start
 * @param  {Function} [callback=undefined]
 * @param  {Error} [callback.err]
 * @return {undefined|Promise.<true|Error>}
 * If callback is provided, return undefined, and error will be delivered by callback.
 * Otherwise, return a promise, which fulfilled with true if no exception occurs or rejected with an error.
 */
Module.prototype.start = function start(callback) {
    var module = this;

    var promise = Promise.resolve()
        .then(function() {
            if (module.initialized === false) return Promise.reject(new Error('module has not been initialized!'));

            return util.returnOrCallback(function(callback) {
                return module._start(callback);
            });
        })
        .then(function(started) {
            if (started === true) {
                module.running = true;
                if (util.isFunction(callback)) callback();
                return started;
            } else if (started === false) {
                return Promise.reject(new Error('module._start failed'));
            } else {
                return Promise.reject(new Error('The value returned from module._start is not a boolean!'));
            }
        });

    if (util.isFunction(callback)) {
        promise.catch(callback);
        return undefined;
    } else {
        return promise;
    }
};

/**
 * Implement your business codes to stop this module.
 *
 * @template
 * @protected
 * @method _stop
 * @param {Function} callback
 * @param {*} callback.return
 * @return {Boolean|Promise.<Boolean>}
 */
Module.prototype._stop = idle;

/**
 * stop running module
 *
 * @method stop
 * @param  {Function} [callback=undefined]
 * @param  {Error} [callback.err]
 * @return {undefined|Promise.<true|Error>}
 * If callback is provided, return undefined, and error will be delivered by callback.
 * Otherwise, return a promise, which fulfilled with true if no exception occurs or rejected with an error.
 */
Module.prototype.stop = function stop(callback) {
    var module = this;

    var promise = Promise.resolve()
        .then(function() {
            if (module.initialized === false) return Promise.reject(new Error('module has not been initialized!'));
            if (module.running === false) return Promise.reject(new Error('module is not running!'));

            return util.returnOrCallback(function(callback) {
                return module._stop(callback);
            });
        })
        .then(function(stopped) {
            if (stopped === true) {
                module.running = false;
                if (util.isFunction(callback)) callback();
                return stopped;
            } else if (stopped === false) {
                return Promise.reject(new Error('module._stop failed'));
            } else {
                return Promise.reject(new Error('The value returned from module._stop is not a boolean!'));
            }
        });

    if (util.isFunction(callback)) {
        promise.catch(callback);
        return undefined;
    } else {
        return promise;
    }
};

/**
 * Implement your business codes to prepare for exiting process.
 *
 * Do not do anything asynchronous.
 * Do not throw any error.
 *
 * @template
 * @protected
 * @method _exit
 * @param  {Function} callback  A synchronously called callback.
 * @param  {Error} [callback.err]  Callback an error when module.stop throws error.
 * @return {Boolean}
 */
Module.prototype._exit = idle;

/**
 * Stop the module, invoke `module._exit` and exit process.
 * It will only be executed once even if with multiple invocations.
 *
 * @method exit
 * @param  {Number} exitCode  The UNIX exit code
 * @return {undefined}
 */
Module.prototype.exit = util.once(function exit(exitCode) {
    var module = this;
    return module.stop()
        .then(function() {
            return module._exit();
        }, function(err) {
            return module._exit(err);
        })
        .catch(function(err) {
            /* eslint-disable no-console */
            console.error('You should catch any error thrown from module._exit by yourself.', err.stack || err);
        })
        .finally(function() {
            process.exit(exitCode || 0);
        });
});

module.exports = Module;

'use strict';

var util = require('./util');
var Promise = require('./promise');

/**
 * @private
 * @method idle
 * @return {undefined}
 */
var idle = util.emtpyCallback;

/**
 * @private
 * @method promiseTrue
 * @return {Promise.<true>}
 */
function promiseTrue() {
    return Promise.resolve(true);
}

/**
 * @class Module
 *
 * @constructor
 * @param {Object} [options]
 * @param {Function} [options.init=idle]
 * @param {Function} [options.start=promiseTrue]
 * @param {Function} [options.stop=promiseTrue]
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
 * Do not do anything asynchronous.
 *
 * @template
 * @protected
 * @throws {Error}  Throw an error if any exception occurs.
 * @method _init
 * @return {*|false}
 * Return anything expect `false` to represent the module has been initialized successfully, and `module.initialized` will be `true`.
 * Returning `false` means that the process of initializing module failed.
 */
Module.prototype._init = idle;

/**
 * Initialize the module.
 * It is only initialized once even if multiple invocations.
 *
 * @method init
 * @throws {Error}  Throw an exception when failed to initialize.
 * @return {true}  The module has been initialized successfully.
 */
Module.prototype.init = function init() {
    var module = this;
    if (module.initialized === true) return true;

    var initialized = module._init();

    if (initialized === false) {
        throw new Error('module._init failed');
    } else {
        module.initialized = true;
    }

    return module.initialized;
};

/**
 * Implement your business codes to start this module.
 *
 * You must invoke the `done` function or return promise to indicate the process of starting module has been done.
 *
 * @template
 * @protected
 * @throws  Throw an error if any exception occurs.
 * @method _start
 * @param  {Function} done  A optional callback for indicating the process has been done.
 * @param  {Error} [done.err]  If pass an error, it means that the process of starting module failed.
 * @return {Promise.<*|Error>}
 * Return a promise fulfilled with anything to represent the module has been started successfully, and `module.running` will be `true`.
 * Returning a promise rejected with a error means that the process of starting module failed.
 */
Module.prototype._start = promiseTrue;

/**
 * initialize and start
 *
 * This method return a promise indicating whether started successfully or not.
 * When any error occurs in this period, the callback(err) will be invoked first (if callback is provided),
 * and then the promise will be rejected with an error.
 *
 * @method start
 * @param  {Function} [callback=undefined]  The callback will be invoked when start function is done.
 * @param  {Error} [callback.err]  The error exists when failed to start module.
 * @return {Promise.<true|Error>}
 */
Module.prototype.start = function start(callback) {
    var module = this;

    var promise = Promise.resolve()
        .then(function() {
            module.init();
            return util.returnOrCallback(function(callback) {
                return module._start(callback);
            });
        })
        .then(function() {
            module.running = true;
        })
        .asCallback(callback)
        .return(true);

    return promise;
};

/**
 * Implement your business codes to stop this module.
 *
 * You must invoke the `done` function or return promise to indicate the process of stopping module has been done.
 *
 * @template
 * @protected
 * @throws  Throw an error if any exception occurs.
 * @method _stop
 * @param  {Function} done  A optional callback for indicating the process has been done.
 * @param  {Error} [done.err]  If pass an error, it means that the process of stopping module failed.
 * @return {Promise.<*|Error>}
 * Return a promise fulfilled with anything to represent the module is stopped successfully, and `module.running` will be false.
 * Returning a promise rejected with a error means that the process of stopping module failed.
 */
Module.prototype._stop = promiseTrue;

/**
 * stop running module
 *
 * This method return a promise indicating whether stopped successfully or not.
 * When any error occurs in this period, the callback(err) will be invoked first (if callback is provided),
 * and then the promise will be rejected with an error.
 *
 * @method stop
 * @param  {Function} [callback=undefined]  The callback will be invoked when stop function is done.
 * @param  {Error} [callback.err]  The error exists when failed to stop module.
 * @return {Promise.<true|Error>}
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
        .then(function() {
            module.running = false;
        })
        .asCallback(callback)
        .return(true);

    return promise;
};

/**
 * Implement your business codes to prepare for exiting process.
 *
 * Do not do anything asynchronous.
 * It is better to catch any exception in the function by yourself.
 *
 * @template
 * @protected
 * @throws {*}
 * @method _exit
 * @return {*}  The returned value does not work.
 */
Module.prototype._exit = idle;

/**
 * Stop the module first, and then invoke `module._exit`. Exit process finally.
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
            console.error('You should catch any exception thrown from module._exit by yourself.', err.stack || err);
        })
        .finally(function() {
            process.exit(exitCode || 0);
        });
});

module.exports = Module;

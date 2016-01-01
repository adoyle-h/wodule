'use strict';

describe('#wodule', function() {
    var should = require('should');
    var Wodule = require('../../src/wodule');
    var _exit = process.exit;

    before(function() {
        process.exit = sinon.spy();
    });

    after(function() {
        process.exit = _exit;
    });

    describe('create a bare Wodule', function() {
        var wodule;
        var spyNames = ['_init', '_start', '_stop', 'stop', '_exit'];

        before(function() {
            wodule = new Wodule();
        });

        beforeEach(function() {
            spyNames.forEach(function(name) {
                var method = Wodule.prototype[name];
                Wodule.prototype[name] = sinon.spy(method);
            });
        });

        afterEach(function() {
            spyNames.forEach(function(name) {
                Wodule.prototype[name].reset();
            });
        });

        it('module.init()', function() {
            wodule.init();
            wodule.initialized.should.be.true();
            Wodule.prototype._init.should.be.calledOnce();
        });

        it('module.start()', function() {
            return wodule.start().then(function(result) {
                result.should.be.true();
                wodule.initialized.should.be.true();
                wodule.running.should.be.true();
                Wodule.prototype._start.should.be.calledOnce();
            });
        });

        it('module.stop()', function() {
            return wodule.stop().then(function(result) {
                result.should.be.true();
                wodule.initialized.should.be.true();
                wodule.running.should.be.false();
                Wodule.prototype._stop.should.be.calledOnce();
            });
        });

        it('module.exit()', function() {
            wodule.exit(3);
            wodule.exit(2);
            return wodule.exit(1).then(function() {
                wodule.initialized.should.be.true();
                wodule.running.should.be.false();

                Wodule.prototype.stop.should.be.calledOnce();
                Wodule.prototype._exit.should.be.calledOnce();
                process.exit.should.be.calledOnce();
                process.exit.should.be.calledWith(3);
            });
        });
    });

    describe('create a Wodule with wrong options', function() {
        /* eslint-disable no-unused-vars, no-console */
        it('throw error when init method is not a function', function() {
            should.throws(function() {
                var wodule = new Wodule({
                    init: 1,
                });
            }, function(err) {
                return err.message === 'The method must be a Function!';
            });
        });

        it('throw error when start method is not a function', function() {
            should.throws(function() {
                var wodule = new Wodule({
                    init: function() {
                        console.log('initialized!');
                    },
                    start: 2,
                });
            }, function(err) {
                return err.message === 'The method must be a Function!';
            });
        });
    });

    describe('test functions with wodule', function() {
        var wodule;
        before(function() {
            wodule = new Wodule();
        });

        describe('init', function() {
            after(function() {
                delete wodule._init;
            });

            it('_init throws an error', function() {
                var message = 'exception occurred in _init';
                wodule._init = function() {
                    throw new Error(message);
                };

                should.throws(function(err) {
                    wodule.init();
                }, function(err) {
                    return err.message === message;
                });
                wodule.initialized.should.be.false();
            });

            it('_init return false', function() {
                wodule._init = function() {
                    return false;
                };

                should.throws(function(err) {
                    wodule.init();
                }, function(err) {
                    return err.message === 'module._init failed';
                });
                wodule.initialized.should.be.false();
            });

            it('_init return undefined', function() {
                wodule._init = function() {};
                wodule.init();
                wodule.initialized.should.be.true();
            });
        });

        describe('start', function () {
            after(function() {
                delete wodule._start;
            });

            it('_start throws an error', function() {
                var message = 'exception occurred in _start';
                wodule._start = function() {
                    throw new Error(message);
                };

                return wodule.start().catch(function(err) {
                    wodule.running.should.be.false();
                    err.message.should.equal(message);
                });
            });

            it('_start callback(err)', function() {
                var message = 'exception occurred in _start';
                wodule._start = function(callback) {
                    callback(new Error(message));
                };

                return wodule.start().catch(function(err) {
                    wodule.running.should.be.false();
                    err.message.should.equal(message);
                });
            });

            it('_start callback()', function() {
                wodule._start = function(callback) {
                    callback();
                };

                return wodule.start()
                    .then(function(result) {
                        wodule.initialized.should.be.true();
                        wodule.running.should.be.true();
                        result.should.be.true();
                    });
            });
        });
    });
});

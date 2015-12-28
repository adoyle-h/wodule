'use strict';

describe('#util', function() {
    var util = require('../../src/util');

    describe('returnOrCallback()', function() {
        var err = new Error('this is an error');
        function func(callback) {
            setImmediate(callback, null, true);
        }
        function func2() {
            return true;
        }
        function func3() {
            return Promise.resolve(true);
        }
        function func4(callback) {
            setImmediate(callback, err);
        }
        function func5() {
            return err;
        }
        function func6() {
            return Promise.reject(err);
        }
        function func7() {
            throw err;
        }

        it('function invokes callback(null, true)', function() {
            return util.returnOrCallback(func)
                .then(function(result) {
                    result.should.equal(true);
                });
        });

        it('function returns true', function() {
            return util.returnOrCallback(func2)
                .then(function(result) {
                    result.should.equal(true);
                });
        });

        it('function returns a Promise.<true>', function() {
            return util.returnOrCallback(func3)
                .then(function(result) {
                    result.should.equal(true);
                });
        });

        it('function invokes callback(err)', function() {
            return util.returnOrCallback(func4)
                .then(function() {
                    throw new Error('this should not be resolved');
                }, function(err) {
                    err.should.be.an.Error();
                    err.message.should.equal('this is an error');
                });
        });

        it('function returns error', function() {
            return util.returnOrCallback(func5)
                .then(function() {
                    err.should.be.an.Error();
                    err.message.should.equal('this is an error');
                }, function() {
                    throw new Error('this should not be rejected');
                });
        });

        it('function returns a Promise.<|Error>', function() {
            return util.returnOrCallback(func6)
                .then(function() {
                    throw new Error('this should not be resolved');
                }, function(err) {
                    err.should.be.an.Error();
                    err.message.should.equal('this is an error');
                });
        });

        it('function throw an error', function() {
            return util.returnOrCallback(func7)
                .then(function() {
                    throw new Error('this should not be resolved');
                }, function() {
                    err.should.be.an.Error();
                    err.message.should.equal('this is an error');
                });
        });
    });

    describe('once()', function() {
        it('function should be executed once even if with multiple invocations.', function() {
            var foo = sinon.spy();
            var f = util.once(foo);
            f();
            f();
            f();
            foo.should.be.calledOnce();
        });
    });
});

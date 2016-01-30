'use strict';

describe('#util', function() {
    var util = require('../../src/util');

    describe('returnOrCallback()', function() {
        it('function invokes callback(null, true)', function() {
            return util.returnOrCallback(function func(callback) {
                setImmediate(callback, null, true);
            })
                .then(function(result) {
                    result.should.equal(true);
                });
        });

        it('function returns a Promise.<true>', function() {
            return util.returnOrCallback(function func3() {
                return Promise.resolve(true);
            })
                .then(function(result) {
                    result.should.equal(true);
                });
        });

        it('function invokes callback(err)', function() {
            return util.returnOrCallback(function func4(callback) {
                setImmediate(callback, new Error('this is an error'));
            })
                .then(function() {
                    throw new Error('this should not be resolved');
                }, function(err) {
                    err.should.be.an.Error();
                    err.message.should.equal('this is an error');
                });
        });

        it('function returns a Promise.<|Error>', function() {
            return util.returnOrCallback(function func6() {
                return Promise.reject(new Error('this is an error'));
            })
                .then(function() {
                    throw new Error('this should not be resolved');
                }, function(err) {
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

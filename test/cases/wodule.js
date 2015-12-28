'use strict';

describe('#wodule', function() {
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
            return wodule.init().tap(function() {
                wodule.initialized.should.be.true();
                Wodule.prototype._init.should.be.calledOnce();
            });
        });

        it('module.start()', function() {
            return wodule.start().tap(function() {
                wodule.initialized.should.be.true();
                wodule.running.should.be.true();
                Wodule.prototype._start.should.be.calledOnce();
            });
        });

        it('module.stop()', function() {
            return wodule.stop().tap(function() {
                wodule.initialized.should.be.true();
                wodule.running.should.be.false();
                Wodule.prototype._stop.should.be.calledOnce();
            });
        });

        it('module.exit()', function() {
            wodule.exit(3);
            wodule.exit(2);
            var p = wodule.exit(1).tap(function() {
                wodule.initialized.should.be.true();
                wodule.running.should.be.false();

                Wodule.prototype.stop.should.be.calledOnce();
                Wodule.prototype._exit.should.be.calledOnce();
                process.exit.should.be.calledOnce();
                process.exit.should.be.calledWith(3);
            });
            return p;
        });
    });
});

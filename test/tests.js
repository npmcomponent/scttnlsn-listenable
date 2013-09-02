var assert = require('assert');
var Emitter = require('emitter');
var listenable = require('listenable');

describe('Listenable', function () {
    beforeEach(function () {
        this.obj = listenable();
        this.emitter = new Emitter();
    });

    it('listens to events', function () {
        var emitted = false;

        this.obj.listen(this.emitter, 'foo', function () {
            emitted = true;
        });

        this.emitter.emit('foo');
        assert(emitted);
    });

    it('unlistens to events on single emitter', function () {
        var emitted = false;

        this.obj.listen(this.emitter, 'foo', function () {
            emitted = true;
        });

        this.obj.unlisten(this.emitter);
        this.emitter.emit('foo');
        assert(emitted === false);
    });

    it('unlistens to events on all emitters', function () {
        var emitted = false;

        this.obj.listen(this.emitter, 'foo', function () {
            emitted = true;
        });

        this.obj.unlisten();
        this.emitter.emit('foo');
        assert(emitted === false);
    });

    it('calls unlisten on destroy', function () {
        var called = false;

        this.obj.unlisten = function () {
            called = true;
        };

        this.obj.destroy();
        assert(called);
    });
});
var advice = require('scttnlsn-advice');
var bind = require('component-bind');
var each = require('component-each');

module.exports = function (obj) {
    obj || (obj = {});

    obj.listen = function (emitter, event, fn) {
        this._listeners || (this._listeners = []);
        emitter.on(event, bind(this, fn));
        this._listeners.push({ emitter: emitter, event: event });
    };

    obj.unlisten = function (emitter) {
        this._listeners || (this._listeners = []);
        each(this._listeners, function (listener) {
            if (!emitter || emitter === listener.emitter) {
                listener.emitter.off(listener.event);
            }
        });
    };

    advice(obj).after('destroy', function () {
        this.unlisten();
    });

    return obj;
};
listenable
==========

Add event handler tracking to an object.

## Install

    component install scttnlsn/listenable

## Usage

Use it directly:

```js
var emitter = require('emitter');
var listenable = require('listenable');

var obj = listenable();
var emitter = new Emitter();

obj.listen(emitter, 'foo', function () {
    console.log('foo');
});

emitter.emit('foo');

obj.unlisten();
```

Or as a mixin:

```js
function Test() {
    this.emitter = new Emitter();
    this.listen(this.emitter, 'foo', this.foo);
}

listenable(Test.prototype);

Test.prototype.foo = function () {
    console.log('foo');
};
```

## API

### .listen(emitter, event, fn)

Register an event handler.  Equivalent to `emitter.on(event, fn)` except the listener is kept track of for easy removal.  Optionally bind `fn` to the given context `ctx`.

### .unlisten([emitter])

Remove event handlers from the given emitter or all emitters if not specified.

### .destroy()

Calls `unlisten()`.  Any existing `destroy` method is called first.

## License

MIT
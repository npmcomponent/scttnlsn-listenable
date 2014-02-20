*This repository is a mirror of the [component](http://component.io) module [scttnlsn/listenable](http://github.com/scttnlsn/listenable). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/scttnlsn-listenable`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
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
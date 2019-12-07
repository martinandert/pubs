# pubs

[![Travis build status](https://img.shields.io/travis/martinandert/pubs/master.svg)](https://travis-ci.org/martinandert/pubs)
[![no dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](https://npmjs.com/package/pubs)
[![license](https://img.shields.io/github/license/martinandert/pubs.svg)](https://github.com/martinandert/pubs/blob/master/LICENSE.txt)
![TypeScript typings](https://img.shields.io/badge/types-TypeScript-blue.svg)

TODO: add intro

## Installation

Install via npm:

```bash
% npm install pubs
```

Or via yarn:

```bash
% yarn add pubs
```

The UMD build is also available on [unpkg](https://unpkg.com/), adding a `pubs` object to the global scope.

```html
<script src="https://unpkg.com/pubs/dist/umd.min.js"></script>
```


## Usage

Using a browser packager like Webpack or Rollup, you can cherry-pick only the functions you're interested in:

```js
import { send, receive } from 'pubs';

receive('my:event', (data) => {
  // do something with data
});

send('my:event', data);
```

If using the UMD build added via `<script src>`, call the methods on the exposed `sar` object:

```html
<script>
  sar.send(/* ... */);
  sar.receive(/*... */);
</script>
```

Here is the complete API reference:


### sar.send

```ts
send(type: string, data?: any): void
```

Dispatches an event of the specified `type` with the specified `data` (optional).

```ts
sar.send('player:play', { src: 'song.mp3' });
```


### sar.receive

```ts
receive(type: string, callback: (data?: any) => void, options?: { limit: number }): Subscription
```

Listens on dispatched events of the specified `type` and, when it receives one, invokes `callback` with the data passed when sending.

```ts
const subscription = sar.receive('player:play', (data) => {
  doSomethingWith(data.src);
});
```

Use the returned `Subscription` object to retrieve some metadata or to cancel receiving further events:

```ts
subscription.received  //=> How often has the event been received?
subscription.remaining //=> How many remaining events can it receive?

subscription.cancelled //=> Did we completely opt out of receiving further events?
subscription.cancel()  //=> Unlisten from the event and set cancelled status.

subscription.paused    //=> Did we temporarily stop receiving further events?
subscription.pause()   //=> Pause listening and set paused status.
subscription.resume()  //=> Resume listening and unset paused status.
```

Note that both `subscription.pause()` and `subscription.resume()` will throw an error if the subscription has been cancelled.

By default, the number of events it can receive is not limited, which means `subscription.remaining` will always return *positive infinity*.

Besides calling `subscription.cancel()` in order to stop listening to further events, you can also restrict the number of times the event will be received by supplying the `limit` option:

```ts
sar.receive('player:play', callback, { limit: 1 });
```

Here, after the event has been received once, it will be auto-cancelled. Furthermore, the subscription's `received` property will have changed from `0` to `1`, and the `remaining` property from `1` to `0`.


### sar.receiveOnce

```ts
receiveOnce(type: string, callback: (data?: any) => void): Subscription
```

A convenience method for the case when you want to receive the event only once.

```ts
sar.receiveOnce('player:play', callback);
```

This is semantically the same as the last example above.


### sar.create

```ts
sar.create(type: string): [
  send(data?: any): void,
  receive(callback: (data?: any) => void, options?: { limit: number }): Subscription
]
```

A convenience method to create both a sender function and a receiver function for the specified `type`.

This is especially useful when coding in TypeScript, as it allows strict-typing the `data`:

```ts
// a.ts
import { create } from 'pubs';

const [sendPlay, receivePlay] = create<Song>('player:play');

export { receivePlay };

// later on (button click, etc.)
sendPlay({ src: 'song.mp3' });
```

```ts
// b.ts
import { receivePlay } from './a.js';

receivePlay((song) => {
  doSomethingWith(song.src);
});
```

Optionally, you can pass a function as the second argument which transforms the arguments passed to `send` into the data structure supplied to the `receive` callback:

```ts
sar.create(type: string, buildData: (...args: any[]) => any): [
  send(...args: any[]): void,
  receive(callback: (data?: any) => void, options?: { limit: number }): Subscription
]
```

Example:

```ts
import { create } from 'pubs';

interface Options {
  action: "push" | "replace";
}

const [navigateTo, receiveNavigateTo] = create(
  "navigate-to",
  (url: string, options: Options = { action: "push" }) => ({
    ...options,
    url,
  })
);

// send...
navigateTo("/foo", { action: "replace" });

// receive...
receiveNavigateTo(({ url, action }) => history[action](url));
```


## Contributing

Here's a quick guide:

1. Fork the repo and `make install` (assumes yarn is installed).
2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `make test`.
3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or are fixing a bug, we need a test!
4. Make the test pass.
5. Push to your fork and submit a pull request.


## Licence

Released under The MIT License.

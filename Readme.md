[![Version][version-badge]][package]
[![Build Status][build-badge]][build]

@callstack/async-storage
==================================

> Cross platform local storage with React Native - like API.

In order to use it, just import from either web or native:

```js
import AsyncStorage from '@callstack/async-storage';
```

and call any of the methods available [here](https://facebook.github.io/react-native/docs/asyncstorage.html). The API is 100% compatible,
including the errors that can be thrown.

```js
AsyncStorage.setItem('key', 'value')
  .then(() => {})
  .catch(() => {})
```

~**Warning:** Unlike React Native AsyncStorage, this module doesn't accept callbacks. If you are already using Promises or async/await, this warning can be ignored.~

Sice the version 1.1.0 we do support **callbacks** (along with promises) for methods `setItem`, `getItem`, `removeItem` and `getAllKeys`. That's mean that this library now plays well with e.g. [redux-persist](https://github.com/rt2zz/redux-persist). :rocket:


<!-- badges -->
[version-badge]: https://img.shields.io/npm/v/@callstack/async-storage.svg?style=flat-square
[package]: https://www.npmjs.com/package/@callstack/async-storage
[build-badge]: https://img.shields.io/circleci/project/github/callstack/async-storage/master.svg?style=flat-square
[build]: https://circleci.com/gh/callstack-io/async-storage

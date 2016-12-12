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

**Warning:** Unlike React Native AsyncStorage, this module doesn't accept callbacks. If you are already using Promises or async/await, this warning can be ignored.

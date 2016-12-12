@callstack/async-storage
==================================

> Cross platform local storage with React Native - like API.

In order to use it, just import from either web or native:

```js
import AsyncStorage from '@callstack/async-storage';
```

and call any of the methods available [here](https://facebook.github.io/react-native/docs/asyncstorage.html), e.g:

```js
AsyncStorage.setItem('key', 'value')
  .then(() => {})
  .catch(() => {})
```

**Implemented methods:**
- [x] setItem
- [x] getItem

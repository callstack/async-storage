/**
 * localStorageMock.js
 * react-native-cross-platform-storage
 *
 * Created by Ferran Negre on 13/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

const createLocalStorage = () => {
  const store = {};
  // $FlowFixMe https://github.com/facebook/flow/issues/285
  Object.defineProperties(store, {
    getItem: {
      get: () => {
        return (key: string) => store[key] || null;
      },
    },
    setItem: {
      get: () => {
        return (key: string, value: string) => {
          store[key] = value;
        };
      },
    },
    removeItem: {
      get: () => {
        return (key: string) => {
          delete store[key];
        };
      },
    },
    clear: {
      get: () => {
        return () => {
          Object.keys(store).forEach((key: string) => {
            store.removeItem(key);
          });
        };
      },
    },
  });
  return store;
};

const localStorageMock = createLocalStorage();
export default localStorageMock;

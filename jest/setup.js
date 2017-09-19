/**
 * setup.js
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
      get: () => (key: string) => store[key] || null,
    },
    setItem: {
      get: () => (key: string, value: string) => {
        store[key] = value;
      },
    },
    removeItem: {
      get: () => (key: string) => {
        delete store[key];
      },
    },
    clear: {
      get: () => () => {
        Object.keys(store).forEach((key: string) => {
          store.removeItem(key);
        });
      },
    },
  });

  return store;
};

window.localStorage = createLocalStorage();

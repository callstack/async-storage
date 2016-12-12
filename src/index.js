/**
 * index.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import type { TAsyncStorage } from './types';

const API: TAsyncStorage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return new Promise((resolve) => {
      window.localStorage.setItem(key, value);
      resolve();
    });
  },
  clear: () => {
    return new Promise((resolve) => {
      window.localStorage.clear();
      resolve();
    });
  },
  getAllKeys: () => {
    return new Promise((resolve) => {
      resolve(Object.keys(localStorage));
    });
  },
  multiGet: (keys) => {
    return new Promise((resolve) => {
      const keyValues = keys.reduce(
        (acc, key) => acc.concat([key, localStorage.getItem(key)]),
        [],
      );
      resolve(keyValues);
    });
  },
};

export default API;

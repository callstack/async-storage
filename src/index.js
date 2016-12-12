/**
 * index.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import type { AsyncStorage } from './types';

const API: AsyncStorage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key)),
  },
  setItem: (key, value) => {
    return new Promise((resolve) => {
      window.localStorage.setItem(key, value);
      resolve();
    });
  },
};

export default API;

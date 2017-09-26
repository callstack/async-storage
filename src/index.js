/**
 * index.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import merge from 'lodash.merge';

import type { TAsyncStorage } from './types';

const API: TAsyncStorage = {
  getItem: key => API.multiGet([key]).then(values => values[0][1]),
  setItem: (key, value) => API.multiSet([[key, value]]),
  clear: () =>
    new Promise(resolve => {
      window.localStorage.clear();
      resolve();
    }),
  getAllKeys: () =>
    new Promise(resolve => {
      resolve(Object.keys(localStorage));
    }),
  removeItem: key => API.multiRemove([key]),
  mergeItem: (key, value) => API.multiMerge([[key, value]]),
  multiGet: keys =>
    new Promise(resolve => {
      const keyValues = keys.reduce(
        (acc, key) => acc.concat([[key, localStorage.getItem(key)]]),
        []
      );
      resolve(keyValues);
    }),
  multiSet: kvPairs =>
    new Promise((resolve, reject) => {
      const errors = [];

      kvPairs.forEach(([key, value]) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    }),
  multiMerge: kvPairs =>
    new Promise((resolve, reject) => {
      const errors = [];

      kvPairs.forEach(([key, value]) => {
        const rawValue = localStorage.getItem(key);

        if (!rawValue) {
          return;
        }

        try {
          localStorage.setItem(
            key,
            JSON.stringify(merge(JSON.parse(rawValue), JSON.parse(value)))
          );
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    }),
  multiRemove: keys =>
    new Promise(resolve => {
      keys.forEach(key => window.localStorage.removeItem(key));
      resolve();
    }),
  flushGetRequests: () => {
    // eslint-disable-next-line
    console.warn('AsyncStorage.flushGetRequests: Not supported on `web`');
  },
};

export default API;

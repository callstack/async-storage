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

import type { TAsyncStorage, Callback } from './types';

const API: TAsyncStorage = {
  getItem: (key, cb?: Callback) =>
    API.multiGet([key])
      .then(values => values[0][1])
      .then(data => {
        cb && cb(null, data);
        return data;
      })
      .catch(err => {
        cb && cb(err, null);
        return err;
      }),
  setItem: (key, value, cb?: Callback) =>
    API.multiSet([[key, value]])
      .then(data => {
        cb && cb(null, data);
        return data;
      })
      .catch(err => {
        cb && cb(err, null);
        return err;
      }),
  getAllKeys: (cb?: Callback) =>
    Promise.resolve(Object.keys(localStorage))
      .then(data => {
        cb && cb(null, data);
        return data;
      })
      .catch(err => {
        cb && cb(err, null);
        return err;
      }),
  removeItem: (key, cb?: Callback) =>
    API.multiRemove([key])
      .then(() => {
        cb && cb(null);
      })
      .catch(err => {
        cb && cb(err, null);
      }),
  clear: () =>
    new Promise(resolve => {
      window.localStorage.clear();
      resolve();
    }),
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

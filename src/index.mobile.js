/**
 * index.mobile.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import { AsyncStorage } from 'react-native';
import type { TAsyncStorage } from './types';

const API: TAsyncStorage = {
  getItem: (key) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key, value) => {
    return AsyncStorage.setItem(key, value);
  },
  clear: () => {
    return AsyncStorage.clear();
  },
  getAllKeys: () => {
    return AsyncStorage.getAllKeys();
  },
  multiGet: (keys) => {
    return AsyncStorage.multiGet(keys);
  },
  removeItem: (key) => {
    return AsyncStorage.removeItem(key);
  },
  mergeItem: (key) => {
    return AsyncStorage.mergeItem(key);
  },
  flushGetRequests: () => {
    return AsyncStorage.flushGetRequests();
  },
  multiSet: (kvPairs) => {
    return AsyncStorage.multiSet(kvPairs);
  },
  multiRemove: (keys) => {
    return AsyncStorage.multiRemove(keys);
  },
  multiMerge: (kvPairs) => {
    return AsyncStorage.multiMerge(kvPairs);
  },
};

export default API;

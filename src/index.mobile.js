/**
 * index.mobile.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import AsyncStorage from '@react-native-community/async-storage';
import type { TAsyncStorage } from './types';

const API: TAsyncStorage = {
  getItem: (key, cb) => AsyncStorage.getItem(key, cb),
  setItem: (key, value, cb) => AsyncStorage.setItem(key, value, cb),
  removeItem: (key, cb) => AsyncStorage.removeItem(key, cb),
  getAllKeys: cb => AsyncStorage.getAllKeys(cb),

  clear: () => AsyncStorage.clear(),
  multiGet: keys => AsyncStorage.multiGet(keys),
  mergeItem: key => AsyncStorage.mergeItem(key),
  flushGetRequests: () => AsyncStorage.flushGetRequests(),
  multiSet: kvPairs => AsyncStorage.multiSet(kvPairs),
  multiRemove: keys => AsyncStorage.multiRemove(keys),
  multiMerge: kvPairs => AsyncStorage.multiMerge(kvPairs),
};

export default API;

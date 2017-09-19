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
  getItem: key => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  clear: () => AsyncStorage.clear(),
  getAllKeys: () => AsyncStorage.getAllKeys(),
  multiGet: keys => AsyncStorage.multiGet(keys),
  removeItem: key => AsyncStorage.removeItem(key),
  mergeItem: key => AsyncStorage.mergeItem(key),
  flushGetRequests: () => AsyncStorage.flushGetRequests(),
  multiSet: kvPairs => AsyncStorage.multiSet(kvPairs),
  multiRemove: keys => AsyncStorage.multiRemove(keys),
  multiMerge: kvPairs => AsyncStorage.multiMerge(kvPairs),
};

export default API;

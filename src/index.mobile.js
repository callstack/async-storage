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
  getAllKeys() => {
    return AsyncStorage.getAllKeys();
  },
};

export default API;

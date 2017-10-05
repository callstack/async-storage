/**
 * types.js
 * react-native-cross-platform-storage
 *
 * Created by Mike Grabowski on 12/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

export type Callback = (err: ?Error, value: any) => void;

/**
 * Describes `AsyncStorage` interface as in React Native
 */
export type TAsyncStorage = {|
  setItem: (key: string, value: string, cb?: Callback) => Promise<void>,
  getItem: (key: string, cb?: Callback) => Promise<?string>,
  getAllKeys: (cb?: Callback) => Promise<Array<string>>,
  removeItem: (key: string, cb?: Callback) => Promise<void>,

  clear: () => Promise<void>,
  multiGet: (keys: Array<string>) => Promise<Array<[string, ?string]>>,
  multiSet: (kvPairs: Array<[string, string]>) => Promise<void>,
  multiMerge: (kvPairs: Array<[string, string]>) => Promise<void>,
  multiRemove: (keys: Array<string>) => Promise<void>,
  mergeItem: (key: string, value: string) => Promise<void>,
  flushGetRequests: () => void,
|};

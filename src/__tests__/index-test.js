/**
 * index-test.js
 * react-native-cross-platform-storage
 *
 * Created by Ferran Negre on 13/12/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import AsyncStorage from '../';

describe('AsyncStorage', () => {
  beforeEach(async () => {
    AsyncStorage.clear();
  });

  test('setItem & getItem', async () => {
    await AsyncStorage.setItem('k1', 'v1');
    expect(await AsyncStorage.getItem('k1')).toEqual('v1');
  });

  test('removeItem', async () => {
    await AsyncStorage.setItem('k1', 'v1');
    await AsyncStorage.removeItem('k1');

    expect(await AsyncStorage.getItem('k1')).toBeNull();
  });

  test('multiSet & multiGet', async () => {
    const arr = [['k1', 'v1'], ['k2', 'v2']];
    await AsyncStorage.multiSet(arr);

    expect(await AsyncStorage.multiGet(['k1', 'k2'])).toEqual(arr);
  });

  test('getAllKeys', async () => {
    const arr = [['k1', 'v1'], ['k2', 'v2']];
    await AsyncStorage.multiSet(arr);
    const keys = await AsyncStorage.getAllKeys();

    expect(keys.length).toBe(2);
  });

  test('clear', async () => {
    const arr = [['k1', 'v1'], ['k2', 'v2']];
    await AsyncStorage.multiSet(arr);
    await AsyncStorage.clear();
    const keys = await AsyncStorage.getAllKeys();

    expect(keys.length).toBe(0);
  });

  test('multiRemove', async () => {
    await AsyncStorage.setItem('k1', 'v1');
    await AsyncStorage.setItem('k2', 'v2');
    await AsyncStorage.setItem('k3', 'v3');
    await AsyncStorage.multiRemove(['k1', 'k3']);

    expect(await AsyncStorage.getAllKeys()).toEqual(['k2']);
  });

  test('mergeItem', async () => {
    await AsyncStorage.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.mergeItem('k1', JSON.stringify({ v2: 'bar' }));

    expect(await AsyncStorage.getItem('k1')).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar',
    }));
  });

  test('multiMerge', async () => {
    await AsyncStorage.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.setItem('k2', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.multiMerge([
      ['k1', JSON.stringify({ v2: 'bar' })],
      ['k2', JSON.stringify({ v2: 'bar' })],
    ]);

    expect(await AsyncStorage.getItem('k1')).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar',
    }));
    expect(await AsyncStorage.getItem('k2')).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar',
    }));
  });
});

describe('AsyncStorage errors', () => {
  beforeEach(async () => {
    AsyncStorage.clear();
  });
  // TODO
});

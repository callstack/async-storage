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

describe('AsyncStorage promises', () => {
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

    expect(await AsyncStorage.getItem('k1')).toEqual(
      JSON.stringify({
        v1: 'foo',
        v2: 'bar',
      })
    );
  });

  test('multiMerge', async () => {
    await AsyncStorage.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.setItem('k2', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.multiMerge([
      ['k1', JSON.stringify({ v2: 'bar' })],
      ['k2', JSON.stringify({ v2: 'bar' })],
    ]);

    expect(await AsyncStorage.getItem('k1')).toEqual(
      JSON.stringify({
        v1: 'foo',
        v2: 'bar',
      })
    );
    expect(await AsyncStorage.getItem('k2')).toEqual(
      JSON.stringify({
        v1: 'foo',
        v2: 'bar',
      })
    );
  });
});

describe('AsyncStorage callbacks', () => {
  beforeEach(async () => {
    AsyncStorage.clear();
  });

  test('setItem', done => {
    AsyncStorage.setItem('k1', 'v1', err => {
      expect(err).toBeNull();
      done();
    });
  });

  test('getItem', async done => {
    const testValue = JSON.stringify({ v1: 'foo' });
    await AsyncStorage.setItem('k1', testValue);

    AsyncStorage.getItem('k1', (err, value) => {
      expect(err).toBeNull();
      expect(value).toEqual(testValue);
      done();
    });
  });

  test('removeItem', async done => {
    await AsyncStorage.setItem('k1', JSON.stringify({ v1: 'foo' }));

    AsyncStorage.removeItem('k1', (err, value) => {
      expect(err).toBeNull();
      expect(value).toEqual();
      done();
    });
  });

  test('removeItem', async done => {
    await AsyncStorage.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await AsyncStorage.setItem('k2', JSON.stringify({ v2: 'boo' }));

    AsyncStorage.getAllKeys((err, value) => {
      expect(err).toBeNull();
      expect(value).toEqual(['k1', 'k2']);
      done();
    });
  });
});

describe.skip('AsyncStorage errors', () => {
  beforeEach(async () => {
    AsyncStorage.clear();
  });
  // TODO
});

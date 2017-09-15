'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AsyncStorage', function () {
  beforeEach(async function () {
    _2.default.clear();
  });

  test('setItem & getItem', async function () {
    await _2.default.setItem('k1', 'v1');
    expect((await _2.default.getItem('k1'))).toEqual('v1');
  });

  test('removeItem', async function () {
    await _2.default.setItem('k1', 'v1');
    await _2.default.removeItem('k1');

    expect((await _2.default.getItem('k1'))).toBeNull();
  });

  test('multiSet & multiGet', async function () {
    var arr = [['k1', 'v1'], ['k2', 'v2']];
    await _2.default.multiSet(arr);

    expect((await _2.default.multiGet(['k1', 'k2']))).toEqual(arr);
  });

  test('getAllKeys', async function () {
    var arr = [['k1', 'v1'], ['k2', 'v2']];
    await _2.default.multiSet(arr);
    var keys = await _2.default.getAllKeys();

    expect(keys.length).toBe(2);
  });

  test('clear', async function () {
    var arr = [['k1', 'v1'], ['k2', 'v2']];
    await _2.default.multiSet(arr);
    await _2.default.clear();
    var keys = await _2.default.getAllKeys();

    expect(keys.length).toBe(0);
  });

  test('multiRemove', async function () {
    await _2.default.setItem('k1', 'v1');
    await _2.default.setItem('k2', 'v2');
    await _2.default.setItem('k3', 'v3');
    await _2.default.multiRemove(['k1', 'k3']);

    expect((await _2.default.getAllKeys())).toEqual(['k2']);
  });

  test('mergeItem', async function () {
    await _2.default.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await _2.default.mergeItem('k1', JSON.stringify({ v2: 'bar' }));

    expect((await _2.default.getItem('k1'))).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar'
    }));
  });

  test('multiMerge', async function () {
    await _2.default.setItem('k1', JSON.stringify({ v1: 'foo' }));
    await _2.default.setItem('k2', JSON.stringify({ v1: 'foo' }));
    await _2.default.multiMerge([['k1', JSON.stringify({ v2: 'bar' })], ['k2', JSON.stringify({ v2: 'bar' })]]);

    expect((await _2.default.getItem('k1'))).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar'
    }));
    expect((await _2.default.getItem('k2'))).toEqual(JSON.stringify({
      v1: 'foo',
      v2: 'bar'
    }));
  });
}); /**
     * index-test.js
     * react-native-cross-platform-storage
     *
     * Created by Ferran Negre on 13/12/16.
     * Copyright © 2016 Callstack.io. All rights reserved.
     *
     * 
     */

describe('AsyncStorage errors', function () {
  beforeEach(async function () {
    _2.default.clear();
  });
  // TODO
});
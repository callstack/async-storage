'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * index.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * react-native-cross-platform-storage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by Mike Grabowski on 12/12/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright © 2016 Callstack.io. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = {
  getItem: function getItem(key, cb) {
    return API.multiGet([key]).then(function (values) {
      return values[0][1];
    }).then(function (data) {
      cb && cb(null, data);
      return data;
    }).catch(function (err) {
      cb && cb(err, null);
      return err;
    });
  },
  setItem: function setItem(key, value, cb) {
    return API.multiSet([[key, value]]).then(function (data) {
      cb && cb(null, data);
      return data;
    }).catch(function (err) {
      cb && cb(err, null);
      return err;
    });
  },
  getAllKeys: function getAllKeys(cb) {
    return Promise.resolve(Object.keys(localStorage)).then(function (data) {
      cb && cb(null, data);
      return data;
    }).catch(function (err) {
      cb && cb(err, null);
      return err;
    });
  },
  removeItem: function removeItem(key, cb) {
    return API.multiRemove([key]).then(function () {
      cb && cb(null);
    }).catch(function (err) {
      cb && cb(err, null);
    });
  },
  clear: function clear() {
    return new Promise(function (resolve) {
      window.localStorage.clear();
      resolve();
    });
  },
  mergeItem: function mergeItem(key, value) {
    return API.multiMerge([[key, value]]);
  },
  multiGet: function multiGet(keys) {
    return new Promise(function (resolve) {
      var keyValues = keys.reduce(function (acc, key) {
        return acc.concat([[key, localStorage.getItem(key)]]);
      }, []);
      resolve(keyValues);
    });
  },
  multiSet: function multiSet(kvPairs) {
    return new Promise(function (resolve, reject) {
      var errors = [];

      kvPairs.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        try {
          localStorage.setItem(key, value);
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    });
  },
  multiMerge: function multiMerge(kvPairs) {
    return new Promise(function (resolve, reject) {
      var errors = [];

      kvPairs.forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        var rawValue = localStorage.getItem(key);

        if (!rawValue) {
          return;
        }

        try {
          localStorage.setItem(key, JSON.stringify((0, _lodash2.default)(JSON.parse(rawValue), JSON.parse(value))));
        } catch (error) {
          errors.push(error);
        }
      });

      return errors.length > 0 ? reject(errors) : resolve();
    });
  },
  multiRemove: function multiRemove(keys) {
    return new Promise(function (resolve) {
      keys.forEach(function (key) {
        return window.localStorage.removeItem(key);
      });
      resolve();
    });
  },
  flushGetRequests: function flushGetRequests() {
    // eslint-disable-next-line
    console.warn('AsyncStorage.flushGetRequests: Not supported on `web`');
  }
};

exports.default = API;

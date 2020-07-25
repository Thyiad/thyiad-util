"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.local = exports.session = void 0;
exports.session = {
  get: function (key, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = "";
    }
    var value = window.sessionStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: function (key, value) {
    window.sessionStorage.setItem(key, value);
  },
};
exports.local = {
  get: function (key, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = "";
    }
    var value = window.localStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: function (key, value) {
    window.localStorage.setItem(key, value);
  },
};
exports.default = {
  session: exports.session,
  local: exports.local,
};

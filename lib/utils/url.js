"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = exports.getBaseHost = void 0;
var query_string_1 = require("query-string");
exports.getBaseHost = function (hostname) {
  if (hostname === void 0) {
    hostname = "";
  }
  hostname = hostname || window.location.hostname;
  if (!/^([^.]+\.){2}[^.]+$/.test(hostname)) {
    return hostname;
  }
  var hostArr = hostname.split(".");
  var baseHost = "." + hostArr.slice(hostArr.length - 2).join(".");
  return baseHost;
};
exports.getQuery = function (urlPath) {
  urlPath = urlPath || window.location.search;
  return query_string_1.default.parseUrl(urlPath).query;
};
exports.default = {
  getBaseHost: exports.getBaseHost,
  getQuery: exports.getQuery,
};

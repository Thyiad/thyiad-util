"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initImplements = exports.thyReq = exports.thyUI = exports.thyUrl = exports.thyStorage = exports.thyCookie = exports.thyStr = void 0;
var str_1 = require("./utils/str");
var cookie_1 = require("./utils/cookie");
var storage_1 = require("./utils/storage");
var url_1 = require("./utils/url");
var ui_1 = require("./utils/ui");
var req_1 = require("./utils/req");
exports.thyStr = str_1.default;
exports.thyCookie = cookie_1.default;
exports.thyStorage = storage_1.default;
exports.thyUrl = url_1.default;
exports.thyUI = ui_1.default;
exports.thyReq = req_1.default;
exports.initImplements = function (options) {
  ui_1.default.initImplements(options.ui);
  req_1.default.initImplements(options.req);
};
exports.default = {
  initImplements: exports.initImplements,
  thyStr: exports.thyStr,
  thyCookie: exports.thyCookie,
  thyStorage: exports.thyStorage,
  thyUrl: exports.thyUrl,
  thyUI: exports.thyUI,
  thyReq: exports.thyReq,
};

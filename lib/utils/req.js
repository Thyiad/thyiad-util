"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
var index_1 = require("../../types/index");
var axios_1 = require("axios");
var constant = require("./constant");
var cookie_1 = require("./cookie");
var ui_1 = require("./ui");
var str_1 = require("./str");
var reqOptions = {
  loginCookeyKey: constant.LOGIN_COOKIE_KEY,
  tokenHeaderName: constant.TOKEN_HEADER_NAME,
  ajaxStatus: constant.AJAX_STATUS,
  logout: function () {
    cookie_1.default.remove(reqOptions.loginCookeyKey);
    window.location.href =
      "/login?target=" + encodeURIComponent(window.location.href);
  },
};
var initImplements = function (options) {
  if (options.loginCookeyKey) {
    reqOptions.loginCookeyKey = options.loginCookeyKey;
  }
  if (options.tokenHeaderName) {
    reqOptions.tokenHeaderName = options.tokenHeaderName;
  }
  if (options.ajaxStatus) {
    reqOptions.ajaxStatus = options.ajaxStatus;
  }
  if (options.logout) {
    reqOptions.logout = options.logout;
  }
};
var axiosInstance = axios_1.default.create({
  baseURL: "/",
  timeout: 30000,
  responseType: "json",
});
axiosInstance.interceptors.request.use(function (req) {
  console.log(
    "======== request start ======== method: " +
      req.method +
      " url: " +
      req.url +
      " headers:" +
      str_1.simpleStringify(req.headers || {}) +
      " params: " +
      str_1.simpleStringify(req.data || req.params || {})
  );
  return req;
});
var request = function (type, url, data, headers, config) {
  headers = headers || {};
  headers[reqOptions.tokenHeaderName] =
    cookie_1.default.get(reqOptions.loginCookeyKey) || "";
  if (config === null || config === void 0 ? void 0 : config.formType) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  var req =
    type === "get"
      ? axiosInstance.get(url, {
          headers: headers,
          data: data,
        })
      : axiosInstance.post(url, data, {
          headers: headers,
        });
  return req
    .then(function (res) {
      var responseData = res.data || {};
      if (responseData.code === reqOptions.ajaxStatus.success) {
        return responseData.data;
      } else if (responseData.code === reqOptions.ajaxStatus.expired) {
        responseData.message = "token已过期，请重新登录";
        reqOptions.logout();
      }
      return Promise.reject(responseData);
    })
    .catch(function (err) {
      (config === null || config === void 0 ? void 0 : config.noToast) &&
        ui_1.toast(err.message || "未知错误", index_1.UITypes.error);
      return Promise.reject(err);
    });
};
exports.get = function (url, data, headers, config) {
  return request("get", url, data, headers, config);
};
exports.post = function (url, data, headers, config) {
  return request("post", url, data, headers, config);
};
exports.default = {
  initImplements: initImplements,
  get: exports.get,
  post: exports.post,
};

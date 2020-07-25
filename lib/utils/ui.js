"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = exports.alert = exports.toast = exports.msgLoading = exports.initImplements = void 0;
var implments = {};
exports.initImplements = function (options) {
  implments = options || {};
};
exports.msgLoading = function (msg) {
  if (!implments.msgLoading) {
    console.log("msgLoading未实现");
    return;
  }
  return implments.msgLoading(msg);
};
exports.toast = function (msg, type) {
  if (!implments.toast) {
    console.log("toast未实现");
    return;
  }
  return implments.toast(msg, type);
};
exports.alert = function (msg, type, content, ok) {
  if (content === void 0) {
    content = "";
  }
  if (!implments.alert) {
    console.log("alert未实现");
    return;
  }
  return implments.alert(msg, type, content, ok);
};
exports.confirm = function (msg, ok, cancel, content) {
  if (!implments.confirm) {
    console.log("confirm未实现");
    return;
  }
  return implments.confirm(msg, ok, cancel, content);
};
exports.default = {
  initImplements: exports.initImplements,
  msgLoading: exports.msgLoading,
  toast: exports.toast,
  alert: exports.alert,
  confirm: exports.confirm,
};

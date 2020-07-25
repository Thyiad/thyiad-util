"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = exports.jsonStringify = exports.simpleStringify = void 0;
var _stringify = function (data) {
  return (
    "{" +
    Object.keys(data)
      .map(function (key) {
        return (
          '"' + key + '": "' + (data[key] ? data[key].toString() : "") + '"'
        );
      })
      .join(",") +
    "}"
  );
};
exports.simpleStringify = function (data) {
  if (Array.isArray(data)) {
    return (
      "[" +
      data
        .map(function (item) {
          return _stringify(item);
        })
        .join(",") +
      "]"
    );
  }
  return _stringify(data);
};
exports.jsonStringify = function (data, defaultValue, beautiful, html) {
  try {
    var content = beautiful
      ? JSON.stringify(data, null, "    ")
      : JSON.stringify(data);
    if (html) {
      if (!content) {
        return "";
      }
      var r = content
        .replace(/\n|\\n/g, "<br>")
        .replace(/\t/g, "&nbsp;")
        .replace(/\\"/g, "")
        .replace(/,/g, ",&nbsp;");
      return r;
    }
    return content;
  } catch (e) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    console.error("JSON stringify error: ", e && e.stack, data);
    throw e;
  }
};
exports.jsonParse = function (json, defaultValue) {
  try {
    return JSON.parse(json);
  } catch (e) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw e;
  }
};
exports.default = {
  simpleStringify: exports.simpleStringify,
  jsonStringify: exports.jsonStringify,
  jsonParse: exports.jsonParse,
};

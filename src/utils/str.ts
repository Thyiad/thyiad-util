import {
  getBirthdayForIdCard as _getBirthdayForIdCard,
  getGenderForIdCard as _getGenderForIdCard,
} from "./idCard";

const _stringify = (data: { [key: string]: any }) => {
  return `{${Object.keys(data)
    .map((key) => {
      return `"${key}": "${data[key] ? data[key].toString() : ""}"`;
    })
    .join(",")}}`;
};

/** 简单可视化json */
export const simpleStringify = (
  data: { [key: string]: any } | [{ [key: string]: any }]
) => {
  if (Array.isArray(data)) {
    return `[${data
      .map((item) => {
        return _stringify(item);
      })
      .join(",")}]`;
  }
  return _stringify(data);
};

/**
 * JSON.stringy
 * @param data 格式化数据
 * @param defaultValue 解析错误后的数据
 */
export const jsonStringify = (
  data: any,
  defaultValue?: string,
  beautiful?: boolean,
  html?: boolean
) => {
  try {
    const content = beautiful
      ? JSON.stringify(data, null, "    ")
      : JSON.stringify(data);
    if (html) {
      if (!content) {
        return "";
      }
      const r = content
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
/**
 * JSON.parse
 * @param json 格式化数据
 * @param defaultValue 解析错误后的数据
 */
export const jsonParse = (json: string, defaultValue?: any) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw e;
  }
};

/**
 * 根据身份证自动获取生日
 */
export const getBirthdayForIdCard = _getBirthdayForIdCard;

/**
 * 根据身份证自动获取性别
 */
export const getGenderForIdCard = _getGenderForIdCard;

export default {
  simpleStringify,
  jsonStringify,
  jsonParse,
  getBirthdayForIdCard,
  getGenderForIdCard,
};

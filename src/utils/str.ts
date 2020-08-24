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
 * @param beautiful 是否有缩进
 * @param html 是否要返回html，会针对换行符等做处理，此处仅为了兼容而保留，建议使用 getHtml
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
        return defaultValue;
      }

      return getHtml(content);
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

/**
 * 获取文件名字
 * 从最后一个.号开始截取
 * @param path 路径
 */
export const getFileName = (path: string): string => {
  if (!path) {
    return "";
  }

  const index = path.lastIndexOf("/");
  if (index < 0) {
    return path;
  }

  return path.substr(index + 1);
};

/**
 * 把html字符串格式化：\n、\t、\"
 * @param html html文本
 * @param onlyEnter 是否仅处理换行符
 */
export const getHtml = (html: string | object, onlyEnter = false) => {
  const content =
    typeof html === "string" ? html : JSON.stringify(html, null, "\t");
  if (!content) {
    return "";
  }
  let r = content.replace(/\n|\\n/g, "<br>");
  if (onlyEnter) {
    return r;
  }
  r = r.replace(/\t/g, "&nbsp;").replace(/\\"/g, "").replace(/,/g, ",&nbsp;");
  return r;
};

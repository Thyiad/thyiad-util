import qs from "query-string";
import * as env from "./env";

/**
 * 获取基域名
 * 只识别 xx.xx.xx，否则返回当前 hostname
 * @param hostname 需要解析的域名，默认当前域名
 */
export const getBaseHost = (hostname = ""): string => {
  hostname = hostname || (env.canUseWindow() && window.location.hostname) || "";
  if (!/^([^.]+\.){2}[^.]+$/.test(hostname)) {
    return hostname;
  }
  const hostArr = hostname.split(".");
  const baseHost = `.${hostArr.slice(hostArr.length - 2).join(".")}`;
  return baseHost;
};

/**
 * 通过 url 解析参数
 * @param urlPath
 */
export const getQuery = (urlPath?: string): { [key: string]: string } => {
  urlPath = urlPath || (env.canUseWindow() && window.location.search) || "";
  const targetQuery: { [key: string]: string } = {};
  const parseQuery = qs.parseUrl(urlPath).query;
  Object.keys(parseQuery).forEach((key) => {
    const val = parseQuery[key];
    if (val == null) {
      targetQuery[key] = "";
    } else if (Array.isArray(val)) {
      targetQuery[key] = val[val.length - 1];
    } else {
      targetQuery[key] = val;
    }
  });
  return targetQuery;
};

/**
 * 格式化 url
 * @param pathname
 * @param params
 */
export const formatUrl = (
  pathname: string,
  params: { [key: string]: string }
) => {
  let search = Object.keys(params)
    .map((paramKey) => {
      return `${paramKey}=${params[paramKey]}`;
    })
    .join("&");
  if (search) {
    search = `?${search}`;
  }
  return `${pathname}${search}`;
};

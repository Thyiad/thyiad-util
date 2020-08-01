import qs from "query-string";

/**
 * 获取基域名
 * 只识别 xx.xx.xx，否则返回当前 hostname
 * @param hostname 需要解析的域名，默认当前域名
 */
export const getBaseHost = (hostname = ""): string => {
  hostname = hostname || window.location.hostname;
  if (!/^([^.]+\.){2}[^.]+$/.test(hostname)) {
    return hostname;
  }
  const hostArr = hostname.split(".");
  const baseHost = `.${hostArr.slice(hostArr.length - 2).join(".")}`;
  return baseHost;
};

/**
 * 通过url解析参数
 * @param urlPath
 */
export const getQuery = (urlPath?: string): { [key: string]: string } => {
  urlPath = urlPath || window.location.search;
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

export default {
  getBaseHost,
  getQuery,
};

import { UITypes } from "../enum";
import axios from "axios";
import * as constant from "./constant";
import Cookies from "./cookie";
import { toast } from "./ui";
import env from "./env";
import qs from "query-string";

export interface ResponseData<T = any> {
  /** 状态码 */
  code: number;
  /** 提示语 */
  msg: string;
  /** 数据 */
  data: T;
}

let reqOptions = {
  loginCookeyKey: constant.LOGIN_COOKIE_KEY,
  tokenHeaderName: constant.TOKEN_HEADER_NAME,
  ajaxStatus: constant.AJAX_STATUS,
  ajaxData: constant.AJAX_DATA,
  logout: () => {
    if (!env.canUseWindow()) {
      return;
    }
    Cookies.remove(reqOptions.loginCookeyKey);
    window.location.href = `/login?target=${encodeURIComponent(
      window.location.href
    )}`;
  },
};

export type ReqImplements = typeof reqOptions;

const initImplements = (options: ReqImplements) => {
  reqOptions = {
    ...reqOptions,
    ...options,
  };
};

/**
 * axios实例
 */
const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 30000,
  responseType: "json",
});

// /**
//  * request中间件
//  */
// axiosInstance.interceptors.request.use((req) => {
//   console.log(
//     `======== request start ======== method: ${req.method} url: ${
//       req.url
//     } headers:${simpleStringify(req.headers || {})} params: ${simpleStringify(
//       req.data || req.params || {}
//     )}`
//   );
//   return req;
// });

const request = <T>(
  type: "get" | "post",
  url: string,
  data?: any,
  headers?: { [key: string]: string },
  config?: { noToast?: boolean; formType?: boolean }
): Promise<T> => {
  headers = headers || {};
  headers[reqOptions.tokenHeaderName] =
    headers[reqOptions.tokenHeaderName] ||
    Cookies.get(reqOptions.loginCookeyKey) ||
    "";
  if (config?.formType) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const req =
    type === "get"
      ? axiosInstance.get<ResponseData<T>>(url, {
          headers,
          ...config,
          params: data,
        })
      : axiosInstance.post<ResponseData<T>>(
          url,
          config?.formType ? qs.stringify(data) : data,
          {
            headers,
          }
        );

  return req
    .then((res) => {
      const responseData: ResponseData = res.data || {};

      if (
        responseData[reqOptions.ajaxData.code] === reqOptions.ajaxStatus.success
      ) {
        return responseData.data;
      } else if (
        responseData[reqOptions.ajaxData.code] === reqOptions.ajaxStatus.expired
      ) {
        responseData.msg = "token已过期，请重新登录";
        reqOptions.logout();
      }

      return Promise.reject(responseData);
    })
    .catch((err) => {
      config?.noToast !== true &&
        toast(
          err[reqOptions.ajaxData.msg] || err.message || "未知错误",
          UITypes.error
        );
      return Promise.reject(err);
    });
};

export const get = <T>(
  url: string,
  data?: { [key: string]: any },
  headers?: { [key: string]: string },
  config?: { noToast?: boolean; formType?: boolean }
): Promise<T> => {
  return request("get", url, data, headers, config);
};

export const post = <T>(
  url: string,
  data?: { [key: string]: any },
  headers?: { [key: string]: string },
  config?: { noToast?: boolean; formType?: boolean }
): Promise<T> => {
  return request("post", url, data, headers, config);
};

export default {
  initImplements,
  get,
  post,
};

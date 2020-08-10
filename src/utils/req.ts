import { UITypes } from "../enum";
import axios from "axios";
import * as constant from "./constant";
import Cookies from "./cookie";
import { toast } from "./ui";
import env from "./env";

export interface ResponseData<T = any> {
  /** 状态码 */
  code: number;
  /** 提示语 */
  message: string;
  /** 数据 */
  data: T;
}

let reqOptions = {
  loginCookeyKey: constant.LOGIN_COOKIE_KEY,
  tokenHeaderName: constant.TOKEN_HEADER_NAME,
  ajaxStatus: constant.AJAX_STATUS,
  logout: () => {
    if (!env.isBrowser()) {
      return;
    }
    Cookies.remove(reqOptions.loginCookeyKey);
    window.location.href = `/login?target=${encodeURIComponent(
      window.location.href
    )}`;
  },
};

export interface ReqImplements {
  loginCookeyKey?: string;
  tokenHeaderName?: string;
  ajaxStatus?: typeof reqOptions.ajaxStatus;
  logout?: () => void;
}

const initImplements = (options: ReqImplements) => {
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
          data,
        })
      : axiosInstance.post<ResponseData<T>>(url, data, {
          headers,
        });

  return req
    .then((res) => {
      const responseData: ResponseData = res.data || {};

      if (responseData.code === reqOptions.ajaxStatus.success) {
        return responseData.data;
      } else if (responseData.code === reqOptions.ajaxStatus.expired) {
        responseData.message = "token已过期，请重新登录";
        reqOptions.logout();
      }

      return Promise.reject(responseData);
    })
    .catch((err) => {
      config?.noToast !== true &&
        toast(err.message || err.msg || "未知错误", UITypes.error);
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

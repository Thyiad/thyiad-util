import { UITypes } from "../enum";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as constant from "./constant";
import { cookies } from "./cookie";
import { toast } from "./ui";
import * as env from "./env";
import qs from "query-string";

export interface ReqOptions {
  loginCookeyKey: string;
  tokenHeaderName: string;
  ajaxStatus: constant.AjaxStatus;
  ajaxData: {
    code: string;
    msg: string;
    data: string;
  };
  responseHandle?: (res: AxiosResponse<any>) => Promise<any>;
  logout: () => void;
}

let reqOptions: ReqOptions = {
  loginCookeyKey: constant.LOGIN_COOKIE_KEY,
  tokenHeaderName: constant.TOKEN_HEADER_NAME,
  ajaxStatus: constant.AJAX_STATUS,
  ajaxData: constant.AJAX_DATA,
  logout: () => {
    if (!env.canUseWindow()) {
      return;
    }
    cookies.remove(reqOptions.loginCookeyKey);
    window.location.href = `/login?target=${encodeURIComponent(
      window.location.href
    )}`;
  },
};

export type ReqImplements = Partial<typeof reqOptions>;

export const initImplements = (options: ReqImplements) => {
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
type RequestConfig = {
  noToast?: boolean;
  formType?: boolean;
} & AxiosRequestConfig;
const request = <T>(
  type: "get" | "post",
  url: string,
  data?: any,
  headers?: { [key: string]: string },
  config?: RequestConfig
): Promise<T> => {
  headers = headers || {};
  headers[reqOptions.tokenHeaderName] =
    headers[reqOptions.tokenHeaderName] ||
    cookies.get(reqOptions.loginCookeyKey) ||
    "";
  if (config?.formType) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const req =
    type === "get"
      ? axiosInstance.get(url, {
        ...config,
        headers,
        params: data,
      })
      : axiosInstance.post(url, config?.formType ? qs.stringify(data) : data, {
        ...config,
        headers,
      });

  return req
    .then((res) => {
      if (reqOptions.responseHandle) {
        return reqOptions.responseHandle(res);
      }

      const responseData = res.data || {};

      if (
        responseData[reqOptions.ajaxData.code] === reqOptions.ajaxStatus.success
      ) {
        return responseData[reqOptions.ajaxData.data];
      } else if (
        responseData[reqOptions.ajaxData.code] === reqOptions.ajaxStatus.expired
      ) {
        responseData[reqOptions.ajaxData.msg] = "token 已过期，请重新登录";
        reqOptions.logout();
      }

      return Promise.reject(responseData);
    })
    .catch((err) => {
      // 默认尝试取配置的 msg 字段
      let errMsg = err[reqOptions.ajaxData.msg];
      // 如果msg字段没有值，再尝试取 error.message
      if (!errMsg && err.message) {
        errMsg = err.message
      }
      // 如果是500状态，覆盖 msg
      if (err.isAxiosError && err.response.status===500 && typeof err.response.data === 'string') {
        errMsg = `请求发生错误：${err.response.data}`
      }
      // 如果是401状态，覆盖 msg
      if (err.isAxiosError && err.response.status === 401) {
        errMsg = "token 已过期，请重新登录";
        reqOptions.logout();
      }
      // 弹窗提示errMsg
      config?.noToast !== true &&
        toast(
          errMsg || '未知错误',
          UITypes.error
        );
      return Promise.reject(err);
    });
};

export const get = <T>(
  url: string,
  data?: { [key: string]: any },
  headers?: { [key: string]: string },
  config?: RequestConfig
): Promise<T> => {
  return request("get", url, data, headers, config);
};

export const post = <T>(
  url: string,
  data?: { [key: string]: any },
  headers?: { [key: string]: string },
  config?: RequestConfig
): Promise<T> => {
  return request("post", url, data, headers, config);
};

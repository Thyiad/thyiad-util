import cookie from "./utils/cookie";
import { UIImplements } from "./utils/ui";
import { ReqImplements } from "./utils/req";
export declare const thyStr: {
  simpleStringify: (
    data:
      | {
          [key: string]: any;
        }
      | [
          {
            [key: string]: any;
          }
        ]
  ) => string;
  jsonStringify: (
    data: any,
    defaultValue?: string | undefined,
    beautiful?: boolean | undefined,
    html?: boolean | undefined
  ) => string;
  jsonParse: (json: string, defaultValue?: any) => any;
};
export declare const thyCookie: cookie.CookiesStatic<object>;
export declare const thyStorage: {
  session: {
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: string) => void;
  };
  local: {
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: string) => void;
  };
};
export declare const thyUrl: {
  getBaseHost: (hostname?: string) => string;
  getQuery: (
    urlPath?: string | undefined
  ) => import("query-string").ParsedQuery<string>;
};
export declare const thyUI: {
  initImplements: (options: UIImplements) => void;
  msgLoading: (msg: string) => any;
  toast: (msg: string, type: import("../types").UITypes) => any;
  alert: (
    msg: string,
    type: import("../types").UITypes,
    content?: any,
    ok?: (() => void) | undefined
  ) => any;
  confirm: (
    msg: string,
    ok?: (() => void) | undefined,
    cancel?: (() => void) | undefined,
    content?: string | undefined
  ) => any;
};
export declare const thyReq: {
  initImplements: (options: ReqImplements) => void;
  get: <T>(
    url: string,
    data?:
      | {
          [key: string]: any;
        }
      | undefined,
    headers?:
      | {
          [key: string]: string;
        }
      | undefined,
    config?:
      | {
          noToast?: boolean | undefined;
          formType?: boolean | undefined;
        }
      | undefined
  ) => Promise<T>;
  post: <T_1>(
    url: string,
    data?:
      | {
          [key: string]: any;
        }
      | undefined,
    headers?:
      | {
          [key: string]: string;
        }
      | undefined,
    config?:
      | {
          noToast?: boolean | undefined;
          formType?: boolean | undefined;
        }
      | undefined
  ) => Promise<T_1>;
};
export interface InitOptions {
  ui: UIImplements;
  req: ReqImplements;
}
export type { UIImplements, ReqImplements };
export declare const initImplements: (options: InitOptions) => void;
declare const _default: {
  initImplements: (options: InitOptions) => void;
  thyStr: {
    simpleStringify: (
      data:
        | {
            [key: string]: any;
          }
        | [
            {
              [key: string]: any;
            }
          ]
    ) => string;
    jsonStringify: (
      data: any,
      defaultValue?: string | undefined,
      beautiful?: boolean | undefined,
      html?: boolean | undefined
    ) => string;
    jsonParse: (json: string, defaultValue?: any) => any;
  };
  thyCookie: cookie.CookiesStatic<object>;
  thyStorage: {
    session: {
      get: (key: string, defaultValue?: any) => any;
      set: (key: string, value: string) => void;
    };
    local: {
      get: (key: string, defaultValue?: any) => any;
      set: (key: string, value: string) => void;
    };
  };
  thyUrl: {
    getBaseHost: (hostname?: string) => string;
    getQuery: (
      urlPath?: string | undefined
    ) => import("query-string").ParsedQuery<string>;
  };
  thyUI: {
    initImplements: (options: UIImplements) => void;
    msgLoading: (msg: string) => any;
    toast: (msg: string, type: import("../types").UITypes) => any;
    alert: (
      msg: string,
      type: import("../types").UITypes,
      content?: any,
      ok?: (() => void) | undefined
    ) => any;
    confirm: (
      msg: string,
      ok?: (() => void) | undefined,
      cancel?: (() => void) | undefined,
      content?: string | undefined
    ) => any;
  };
  thyReq: {
    initImplements: (options: ReqImplements) => void;
    get: <T>(
      url: string,
      data?:
        | {
            [key: string]: any;
          }
        | undefined,
      headers?:
        | {
            [key: string]: string;
          }
        | undefined,
      config?:
        | {
            noToast?: boolean | undefined;
            formType?: boolean | undefined;
          }
        | undefined
    ) => Promise<T>;
    post: <T_1>(
      url: string,
      data?:
        | {
            [key: string]: any;
          }
        | undefined,
      headers?:
        | {
            [key: string]: string;
          }
        | undefined,
      config?:
        | {
            noToast?: boolean | undefined;
            formType?: boolean | undefined;
          }
        | undefined
    ) => Promise<T_1>;
  };
};
export default _default;

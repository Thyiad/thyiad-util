declare let reqOptions: {
  loginCookeyKey: string;
  tokenHeaderName: string;
  ajaxStatus: {
    success: number;
    error: number;
    expired: number;
  };
  logout: () => void;
};
export interface ReqImplements {
  loginCookeyKey?: string;
  tokenHeaderName?: string;
  ajaxStatus?: typeof reqOptions.ajaxStatus;
  logout?: () => void;
}
export declare const get: <T>(
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
export declare const post: <T>(
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
declare const _default: {
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
export default _default;

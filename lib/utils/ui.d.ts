import { UITypes } from "../../types/index";
export interface UIImplements {
  msgLoading?: typeof msgLoading;
  toast?: typeof toast;
  alert?: typeof alert;
  confirm?: typeof confirm;
}
export declare const initImplements: (options: UIImplements) => void;
export declare const msgLoading: (msg: string) => any;
export declare const toast: (msg: string, type: UITypes) => any;
export declare const alert: (
  msg: string,
  type: UITypes,
  content?: any,
  ok?: (() => void) | undefined
) => any;
export declare const confirm: (
  msg: string,
  ok?: (() => void) | undefined,
  cancel?: (() => void) | undefined,
  content?: string | undefined
) => any;
declare const _default: {
  initImplements: (options: UIImplements) => void;
  msgLoading: (msg: string) => any;
  toast: (msg: string, type: UITypes) => any;
  alert: (
    msg: string,
    type: UITypes,
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
export default _default;

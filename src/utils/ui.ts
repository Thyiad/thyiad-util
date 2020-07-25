import { UITypes } from "../enum";

export interface UIImplements {
  msgLoading?: typeof msgLoading;
  toast?: typeof toast;
  alert?: typeof alert;
  confirm?: typeof confirm;
}

let implments: UIImplements = {};

export const initImplements = (options: UIImplements) => {
  implments = options || {};
};

/**
 * 顶部加载中提示，是否overlay、阻止用户操作由实现决定
 * @param msg 提示内容
 */
export const msgLoading = (msg: string): any => {
  if (!implments.msgLoading) {
    console.log("msgLoading未实现");
    return;
  }
  return implments.msgLoading(msg);
};

/**
 * toast消息
 * @param msg 需要toast的消息内容
 * @param type
 */
export const toast = (msg: string, type: UITypes = UITypes.success): any => {
  if (!implments.toast) {
    console.log("toast未实现");
    return;
  }

  return implments.toast(msg, type);
};

/**
 * alert 消息框
 * @param msg
 * @param type
 * @param content
 */
export const alert = (
  msg: string,
  type: UITypes = UITypes.success,
  content: any = "",
  ok?: () => void
) => {
  if (!implments.alert) {
    console.log("alert未实现");
    return;
  }

  return implments.alert(msg, type, content, ok);
};

/**
 * 确认弹窗
 * @param msg 提示消息
 * @param ok 确认回调
 * @param cancel 取消回调
 */
export const confirm = (
  msg: string,
  ok?: () => void,
  cancel?: () => void,
  content?: string
) => {
  if (!implments.confirm) {
    console.log("confirm未实现");
    return;
  }

  return implments.confirm(msg, ok, cancel, content);
};

export default {
  initImplements,
  msgLoading,
  toast,
  alert,
  confirm,
};

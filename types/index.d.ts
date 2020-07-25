export enum UITypes {
  success = "success",
  warning = "warning",
  info = "info",
  error = "error",
}

export interface ResponseData<T = any> {
  /** 状态码 */
  code: number;
  /** 提示语 */
  message: string;
  /** 数据 */
  data: T;
}

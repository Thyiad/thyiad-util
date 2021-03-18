export const LOGIN_COOKIE_KEY = "loginCookieKey";
export const TOKEN_HEADER_NAME = "accessKey";
export type AjaxStatus = {
  success: number | string;
  error: number | string;
  expired: number | string;
};
export const AJAX_STATUS: AjaxStatus = {
  success: 2000,
  error: 3000,
  expired: 4000,
};
export const AJAX_DATA = {
  code: "code",
  msg: "msg",
  data: "data",
};

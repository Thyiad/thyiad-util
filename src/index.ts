import _str from "./utils/str";
import _cookie from "./utils/cookie";
import _storage from "./utils/storage";
import _url from "./utils/url";
import _ui, { UIImplements } from "./utils/ui";
import _req, { ResponseData, ReqImplements } from "./utils/req";

export const thyStr = _str;
export const thyCookie = _cookie;
export const thyStorage = _storage;
export const thyUrl = _url;
export const thyUI = _ui;
export const thyReq = _req;

export type { UIImplements, ReqImplements, ResponseData };
export { UITypes } from "./enum";

export interface InitOptions {
  ui: UIImplements;
  req: ReqImplements;
}

export const initImplements = (options: InitOptions) => {
  _ui.initImplements(options.ui);
  _req.initImplements(options.req);
};

export default {
  initImplements,
  thyStr,
  thyCookie,
  thyStorage,
  thyUrl,
  thyUI,
  thyReq,
};

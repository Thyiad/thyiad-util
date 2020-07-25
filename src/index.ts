import str from "./utils/str";
import cookie from "./utils/cookie";
import storage from "./utils/storage";
import url from "./utils/url";
import ui, { UIImplements } from "./utils/ui";
import req, { ReqImplements } from "./utils/req";

export const thyStr = str;
export const thyCookie = cookie;
export const thyStorage = storage;
export const thyUrl = url;
export const thyUI = ui;
export const thyReq = req;

interface InitOptions {
  ui: UIImplements;
  req: ReqImplements;
}

export const initImplements = (options: InitOptions) => {
  ui.initImplements(options.ui);
  req.initImplements(options.req);
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

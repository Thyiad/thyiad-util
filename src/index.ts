import * as _str from "./utils/str";
import { cookies } from "./utils/cookie";
import * as _storage from "./utils/storage";
import * as _url from "./utils/url";
import * as _ui from "./utils/ui";
import * as _req from "./utils/req";
import * as _regex from "./utils/regex";
import * as _env from "./utils/env";
import * as _date from "./utils/date";

import { UIImplements } from "./utils/ui";
import { ReqImplements } from "./utils/req";

export const thyStr = _str;
export const thyCookie = cookies;
export const thyStorage = _storage;
export const thyUrl = _url;
export const thyUI = _ui;
export const thyReq = _req;
export const thyRegex = _regex;
export const thyEnv = _env;
export const thyDate = _date;

export type { UIImplements, ReqImplements };
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
  thyRegex,
  thyEnv,
  thyDate,
};

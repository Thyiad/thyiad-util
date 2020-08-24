import * as env from "./env";

export const session = {
  get: (key: string, defaultValue: any = "") => {
    if (!env.canUseWindow()) {
      return defaultValue;
    }
    const value = window.sessionStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    if (!env.canUseWindow()) {
      return;
    }
    window.sessionStorage.setItem(key, value);
  },
};

export const local = {
  get: (key: string, defaultValue: any = "") => {
    if (!env.canUseWindow()) {
      return defaultValue;
    }
    const value = window.localStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    if (!env.canUseWindow()) {
      return;
    }
    window.localStorage.setItem(key, value);
  },
};

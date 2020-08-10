import env from "./env";

export const session = {
  get: (key: string, defaultValue: any = "") => {
    if (!env.isBrowser()) {
      return defaultValue;
    }
    const value = window.sessionStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    if (!env.isBrowser()) {
      return;
    }
    window.sessionStorage.setItem(key, value);
  },
};

export const local = {
  get: (key: string, defaultValue: any = "") => {
    if (!env.isBrowser()) {
      return defaultValue;
    }
    const value = window.localStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    if (!env.isBrowser()) {
      return;
    }
    window.localStorage.setItem(key, value);
  },
};

export default {
  session,
  local,
};

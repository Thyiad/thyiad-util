export const session = {
  get: (key: string, defaultValue: any = "") => {
    const value = window.sessionStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    window.sessionStorage.setItem(key, value);
  },
};

export const local = {
  get: (key: string, defaultValue: any = "") => {
    const value = window.localStorage.getItem(key);
    return value == null ? defaultValue : value;
  },
  set: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },
};

export default {
  session,
  local,
};

export declare const session: {
  get: (key: string, defaultValue?: any) => any;
  set: (key: string, value: string) => void;
};
export declare const local: {
  get: (key: string, defaultValue?: any) => any;
  set: (key: string, value: string) => void;
};
declare const _default: {
  session: {
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: string) => void;
  };
  local: {
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, value: string) => void;
  };
};
export default _default;

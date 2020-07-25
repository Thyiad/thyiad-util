import qs from "query-string";
export declare const getBaseHost: (hostname?: string) => string;
export declare const getQuery: (
  urlPath?: string | undefined
) => qs.ParsedQuery<string>;
declare const _default: {
  getBaseHost: (hostname?: string) => string;
  getQuery: (urlPath?: string | undefined) => qs.ParsedQuery<string>;
};
export default _default;

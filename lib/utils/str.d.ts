export declare const simpleStringify: (
  data:
    | {
        [key: string]: any;
      }
    | [
        {
          [key: string]: any;
        }
      ]
) => string;
export declare const jsonStringify: (
  data: any,
  defaultValue?: string | undefined,
  beautiful?: boolean | undefined,
  html?: boolean | undefined
) => string;
export declare const jsonParse: (json: string, defaultValue?: any) => any;
declare const _default: {
  simpleStringify: (
    data:
      | {
          [key: string]: any;
        }
      | [
          {
            [key: string]: any;
          }
        ]
  ) => string;
  jsonStringify: (
    data: any,
    defaultValue?: string | undefined,
    beautiful?: boolean | undefined,
    html?: boolean | undefined
  ) => string;
  jsonParse: (json: string, defaultValue?: any) => any;
};
export default _default;

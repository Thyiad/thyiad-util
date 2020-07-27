const _ua = window.navigator.userAgent.toLowerCase();

export const isIos = /iphone os/i.test(_ua) || /ipad/i.test(_ua);
export const isAndroid = /android/i.test(_ua);
export const isWechat = /micromessenger/i.test(_ua);
/**
 * 是否微信小程序，仅微信7.0以上生效
 */
export const isWechatMiniProgram = isWechat && /miniprogram/i.test(_ua);

export default {
  isIos,
  isAndroid,
  isWechat,
  isWechatMiniProgram,
};

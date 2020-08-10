const isBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);

const isNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return isBrowser() ? window.navigator.userAgent.toLowerCase() : "";
};

const isWechat = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /micromessenger/i.test(getUserAgent(ua));
};

const isAndroid = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /android/i.test(getUserAgent(ua));
};

const isIos = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /iphone os/i.test(ua) || /ipad/i.test(ua);
};

const isWechatMinProgram = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return isWechat(ua) && ua.indexOf("miniprogram") > -1;
};

export default {
  isBrowser,
  isNode,
  isIos,
  isAndroid,
  isWechat,
  isWechatMinProgram,
};

const canUseWindow = () => {
  return typeof window !== undefined;
};

const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return canUseWindow() ? window.navigator.userAgent.toLowerCase() : "";
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
  canUseWindow,
  isIos,
  isAndroid,
  isWechat,
  isWechatMinProgram,
};

export const canUseWindow = () => {
  return typeof window !== "undefined";
};

export const getUserAgent = (ua?: string) => {
  if (ua) {
    return ua.toLowerCase();
  }
  return canUseWindow() ? window.navigator.userAgent.toLowerCase() : "";
};

export const isWechat = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /micromessenger/i.test(getUserAgent(ua));
};

export const isAndroid = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /android/i.test(getUserAgent(ua));
};

export const isIos = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return /iphone os/i.test(ua) || /ipad/i.test(ua);
};

export const isWechatMinProgram = (userAgent?: string) => {
  const ua = getUserAgent(userAgent);
  return isWechat(ua) && ua.indexOf("miniprogram") > -1;
};

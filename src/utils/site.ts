/**
 * 初始化百度统计代码
 */
export const initHmt = (code: string) => {
  window._hmt = window._hmt || [];
  var hm = document.createElement("script");
  hm.src = `https://hm.baidu.com/hm.js?${code}`;
  var s = document.getElementsByTagName("script")[0];
  if (s.parentNode) {
    s.parentNode.insertBefore(hm, s);
  }
};

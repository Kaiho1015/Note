// 移动端检测
export function isMobile(): boolean {
    const userAgent: string = navigator.userAgent.toUpperCase();
    if (/IPHONE|IPOD/.test(userAgent) && /MOBILE/.test(userAgent)) {
      return true;
    } else if (/ANDROID/.test(userAgent) && /MOBILE/.test(userAgent)) {
      return true;
    } else if (/IPAD/.test(userAgent) && /MOBILE/.test(userAgent)) {
      return false;
    } else {
      return false;
    }
  }
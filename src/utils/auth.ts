import Taro from "@tarojs/taro";

const LOGIN_STORAGE_KEY = "login_status";
const LOGIN_EXPIRE_DAYS = 3; // 登录有效期3天
export const saveLoginStatus = (userInfo?: {
  token?: string;
  openid?: string;
  sessionKey?: string;
  expiresIn?: number;
  userInfo?: any;
  [key: string]: any;
}) => {
  const now = Date.now();

  // 如果后端返回了expiresIn（秒），使用它来计算过期时间
  // 否则使用默认的3天过期时间
  let expireTime: number;
  if (userInfo?.expiresIn) {
    // expiresIn是秒，转换为毫秒
    expireTime = now + userInfo.expiresIn * 1000;
  } else {
    expireTime = now + LOGIN_EXPIRE_DAYS * 24 * 60 * 60 * 1000; // 3天后过期
  }

  const loginStatus: LoginStatus = {
    isLoggedIn: true,
    loginTime: now,
    expireTime,
    userInfo: userInfo ? { ...userInfo } : undefined,
  };

  try {
    Taro.setStorageSync(LOGIN_STORAGE_KEY, loginStatus);
    console.log("登录状态已保存，过期时间:", new Date(expireTime).toLocaleString());
  } catch (error) {
    console.error("保存登录状态失败:", error);
  }
};

/**
 * 清除登录状态
 */
export const clearLoginStatus = () => {
  try {
    Taro.removeStorageSync(LOGIN_STORAGE_KEY);
    console.log("登录状态已清除");
  } catch (error) {
    console.error("清除登录状态失败:", error);
  }
};

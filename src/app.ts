import Taro, { useLaunch, useDidShow } from "@tarojs/taro";

import { useEffect, useRef } from "react";

import useAuth from "@/hooks/useAuth";

import type { PropsWithChildren } from "react";
import type React from "react";

import "./app.scss";

// 不需要检查登录的页面白名单
const NO_AUTH_CHECK_PAGES = [
  "pages/Login/index", // 登录页
  "pages/Category/index", // 分类页
];

// 只在初始化时检查一次的页面
const CHECK_ONCE_PAGES = [
  "pages/Home/index", // 首页
  "pages/Profile/index", //我的
];

const App = ({ children }: PropsWithChildren): React.ReactNode => {
  const { checkLoginStatus } = useAuth();
  const hasCheckedOnce = useRef<Set<string>>(new Set());

  // 检查当前页面是否需要验证登录
  const shouldCheckAuth = (isInitialCheck = false): boolean => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];

    if (!currentPage) {
      return true;
    }

    const currentRoute = currentPage.route || "";

    // 如果当前页面在白名单中，不检查登录
    if (NO_AUTH_CHECK_PAGES.some((page) => currentRoute.includes(page))) {
      return false;
    }

    // 如果当前页面只需要检查一次
    if (CHECK_ONCE_PAGES.some((page) => currentRoute.includes(page))) {
      // 如果是初始化检查，允许检查并记录
      if (isInitialCheck) {
        if (hasCheckedOnce.current.has(currentRoute)) {
          return false;
        }
        hasCheckedOnce.current.add(currentRoute);
        return true;
      }
      // 非初始化检查，不再检查
      return false;
    }

    return true;
  };

  // 应用启动时检查登录状态
  useLaunch(() => {
    console.log("App launched.");
    if (shouldCheckAuth(true)) {
      checkLoginStatus(true);
    }
  });

  // 每次应用从后台进入前台时检查登录状态
  useDidShow(() => {
    console.log("App did show.");
    if (shouldCheckAuth()) {
      checkLoginStatus(true);
    }
  });

  // 每次组件渲染时检查登录状态（包括刷新）
  useEffect(() => {
    console.log("App effect - checking login status.");
    if (shouldCheckAuth(true)) {
      checkLoginStatus(true);
    }
  }, [checkLoginStatus]);

  // children 是将要会渲染的页面
  return children;
};

export default App;

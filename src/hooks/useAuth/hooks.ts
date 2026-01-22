import Taro from "@tarojs/taro";

import { useState } from "react";

import UserService from "@/services/userServices";
import { useUserStore } from "@/store/userStore";
import { clearLoginStatus } from "@/utils/auth";

import type { ILoginRequest, IUserProfile, IQueryUserInfoRequest } from "@/services/userServices";

interface IUseAuthProps {
  loading: boolean;
  fetchUserProfile: (query: IQueryUserInfoRequest) => Promise<void | IUserProfile>;
  logout: (payload: ILoginRequest) => Promise<void>;
  login: (payload: ILoginRequest) => Promise<void>;
  checkLoginStatus: (showPrompt?: boolean) => Promise<boolean>;
}

const useAuth = (): IUseAuthProps => {
  const [loading, setLoading] = useState(false);
  const setAuth = useUserStore((state) => state.setAuth);
  const setProfile = useUserStore((state) => state.setProfile);
  const clearStore = useUserStore((state) => state.clear);

  //查询用户信息
  const fetchUserProfile = async (query: IQueryUserInfoRequest): Promise<void | IUserProfile> => {
    try {
      await Taro.showLoading({
        title: "加载中",
        mask: true,
      });
      const res = await UserService.getUserInfo(query);
      setProfile(res || {});
    } catch (error) {
      console.log(error);
    } finally {
      Taro.hideLoading({});
    }
  };

  //登录
  const login = async (payload: ILoginRequest): Promise<void> => {
    try {
      setLoading(true);
      const res = await UserService.loginUser(payload);
      if (!res || !res.token) {
        return;
      }
      setAuth(res.token, res.expiresIn);
      await fetchUserProfile({ username: payload.username });
    } catch (error) {
      console.log(error, "报错了");
    } finally {
      setLoading(false);
    }
  };

  //退出登录
  const logout = async (payload: ILoginRequest): Promise<void> => {
    clearStore();
    clearLoginStatus();
    await UserService.loginUser(payload);
  };

  //检查登录状态
  const checkLoginStatus = async (showPrompt = true): Promise<boolean> => {
    const token = useUserStore.getState().token;
    const expiresIn = useUserStore.getState().expiresIn;

    // 没有 token，未登录
    if (!token) {
      if (showPrompt) {
        try {
          const res = await Taro.showModal({
            title: "提示",
            content: "您还未登录，是否前往登录？",
            confirmText: "去登录",
            cancelText: "暂不登录",
          });

          if (res.confirm) {
            // 用户点击去登录，跳转到登录页
            Taro.navigateTo({
              url: "/pages/Login/index",
            });
          }
        } catch (error) {
          console.error("显示登录提示失败:", error);
        }
      }
      return false;
    }

    // 如果有过期时间，检查是否过期
    if (expiresIn) {
      const now = Date.now();
      const expireTime = now + expiresIn * 1000; // expiresIn 是秒，转换为毫秒

      if (now >= expireTime) {
        // token 已过期，清除登录状态
        clearStore();
        clearLoginStatus();

        if (showPrompt) {
          try {
            const res = await Taro.showModal({
              title: "登录已过期",
              content: "您的登录已过期，请重新登录",
              confirmText: "重新登录",
              cancelText: "取消",
              showCancel: true,
            });

            if (res.confirm) {
              // 用户点击重新登录，跳转到登录页
              Taro.navigateTo({
                url: "/pages/Login/index",
              });
            }
          } catch (error) {
            console.error("显示过期提示失败:", error);
          }
        }
        return false;
      }
    }

    return true;
  };

  return { loading, fetchUserProfile, login, logout, checkLoginStatus };
};

export default useAuth;

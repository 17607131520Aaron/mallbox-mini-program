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

  return { loading, fetchUserProfile, login, logout };
};

export default useAuth;

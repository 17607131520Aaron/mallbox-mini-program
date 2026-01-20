import type { ILoginResponse, ILoginRequest, IRegisterRequest, IQueryUserInfoRequest, IUserProfile } from "./type";

import { get, post } from "@/utils/request";

class UserService {
  // 注册账号
  registerUser = (data: IRegisterRequest): Promise<boolean> =>
    post<IRegisterRequest, boolean>({
      url: "/userinfo/registerUser",
      data,
    });

  // 账号密码登录
  loginUser = (data: ILoginRequest): Promise<ILoginResponse> =>
    post<ILoginRequest, ILoginResponse>({
      url: "/userinfo/userLogin",
      data,
    });

  // 查询用户信息
  getUserInfo = (params: IQueryUserInfoRequest): Promise<IUserProfile> =>
    get<IQueryUserInfoRequest, IUserProfile>({
      url: "/userinfo/getUserInfoByUsername",
      data: params,
    });
}

export default new UserService();

export interface IRegisterRequest {
  username: string;
  realName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  phone?: string;
  wechatOpenId?: string;
  wechatAvatarUrl?: string | null;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token?: string;
  expiresIn?: number;
  [key: string]: any;
}

export interface IQueryUserInfoRequest {
  id?: string;
  username?: string;
  wechatOpenId?: string;
}

export interface IUserProfile {
  id: number;
  username: string;
  realName?: string | null;
  email?: string | null;
  phone?: string | null;
  wechatOpenId?: string | null;
  wechatNickName?: string | null;
  wechatAvatarUrl?: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
}

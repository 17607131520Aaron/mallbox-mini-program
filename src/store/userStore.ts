import { create } from "zustand";

interface IUserProfile {
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

export interface UserState {
  token: string | null;
  expiresIn?: number;
  profile: IUserProfile | null;
  setAuth: (token: string, expiresIn?: number) => void;
  setProfile: (profile: IUserProfile | null) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  expiresIn: undefined,
  profile: null,
  setAuth: (token, expiresIn) => set({ token, expiresIn }),
  setProfile: (profile) => set({ profile }),
  clear: () => set({ token: null, expiresIn: undefined, profile: null }),
}));

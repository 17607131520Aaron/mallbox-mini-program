// 用户信息模拟数据
import type { IUserInfo, IOrderStats } from "./type";

export const mockUserInfo: IUserInfo = {
  id: "user123",
  nickname: "用户昵称",
  avatar: "",
};

// 订单统计模拟数据
export const mockOrderStats: IOrderStats = {
  unpaid: 2,
  unshipped: 1,
  unreceived: 3,
  uncommented: 5,
};

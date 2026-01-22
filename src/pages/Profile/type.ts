// 订单统计类型
export interface IOrderStats {
  unpaid: number;
  unshipped: number;
  unreceived: number;
  uncommented: number;
}

// 用户信息类型
export interface IUserInfo {
  id: string;
  nickname: string;
  avatar: string;
}

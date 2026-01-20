// 轮播图数据类型
export interface BannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
}

// 分类数据类型
export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

// 商品数据类型
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

// 购物车商品类型
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  selected: boolean;
}

// 用户信息类型
export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
}

// 订单统计类型
export interface OrderStats {
  unpaid: number;
  unshipped: number;
  unreceived: number;
  uncommented: number;
}

// 一级分类类型
export interface MainCategory {
  id: string;
  name: string;
}

// 二级分类类型
export interface SubCategory {
  id: string;
  name: string;
  imageUrl: string;
  parentId: string;
}

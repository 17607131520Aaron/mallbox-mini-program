import type {
  BannerItem,
  CategoryItem,
  ProductItem,
  CartItem,
  UserInfo,
  OrderStats,
  MainCategory,
  SubCategory,
} from "../types";

// 轮播图模拟数据
export const mockBanners: BannerItem[] = [
  { id: "1", imageUrl: "", linkUrl: "" },
  { id: "2", imageUrl: "", linkUrl: "" },
  { id: "3", imageUrl: "", linkUrl: "" },
];

// 首页分类模拟数据
export const mockCategories: CategoryItem[] = [
  { id: "1", name: "女装", icon: "👗" },
  { id: "2", name: "男装", icon: "👔" },
  { id: "3", name: "鞋靴", icon: "👟" },
  { id: "4", name: "箱包", icon: "👜" },
  { id: "5", name: "配饰", icon: "💍" },
  { id: "6", name: "美妆", icon: "💄" },
  { id: "7", name: "家居", icon: "🏠" },
  { id: "8", name: "数码", icon: "📱" },
  { id: "9", name: "运动", icon: "⚽" },
  { id: "10", name: "食品", icon: "🍔" },
];

// 商品模拟数据
export const mockProducts: ProductItem[] = [
  {
    id: "1",
    name: "时尚连衣裙女夏季新款修身显瘦气质裙子",
    price: 199,
    originalPrice: 299,
    imageUrl: "",
    sales: 1234,
  },
  {
    id: "2",
    name: "休闲T恤男短袖纯棉宽松",
    price: 89,
    originalPrice: 129,
    imageUrl: "",
    sales: 856,
  },
  {
    id: "3",
    name: "运动鞋男透气跑步鞋",
    price: 259,
    imageUrl: "",
    sales: 2341,
  },
  {
    id: "4",
    name: "时尚女包单肩包斜挎包",
    price: 159,
    originalPrice: 239,
    imageUrl: "",
    sales: 567,
  },
  {
    id: "5",
    name: "无线蓝牙耳机入耳式",
    price: 129,
    imageUrl: "",
    sales: 3456,
  },
  {
    id: "6",
    name: "智能手表运动手环",
    price: 399,
    originalPrice: 599,
    imageUrl: "",
    sales: 789,
  },
];

// 购物车模拟数据
export const mockCartItems: CartItem[] = [
  {
    id: "1",
    productId: "p1",
    name: "时尚连衣裙女夏季新款修身显瘦气质裙子",
    price: 199,
    quantity: 1,
    imageUrl: "",
    selected: true,
  },
  {
    id: "2",
    productId: "p2",
    name: "休闲T恤男短袖纯棉宽松",
    price: 89,
    quantity: 2,
    imageUrl: "",
    selected: false,
  },
];

// 用户信息模拟数据
export const mockUserInfo: UserInfo = {
  id: "user123",
  nickname: "用户昵称",
  avatar: "",
};

// 订单统计模拟数据
export const mockOrderStats: OrderStats = {
  unpaid: 2,
  unshipped: 1,
  unreceived: 3,
  uncommented: 5,
};

// 一级分类模拟数据
export const mockMainCategories: MainCategory[] = [
  { id: "1", name: "女装" },
  { id: "2", name: "男装" },
  { id: "3", name: "鞋靴" },
  { id: "4", name: "箱包" },
  { id: "5", name: "配饰" },
  { id: "6", name: "美妆" },
  { id: "7", name: "家居" },
  { id: "8", name: "数码" },
];

// 二级分类模拟数据
export const mockSubCategories: SubCategory[] = [
  { id: "1-1", name: "连衣裙", imageUrl: "", parentId: "1" },
  { id: "1-2", name: "T恤", imageUrl: "", parentId: "1" },
  { id: "1-3", name: "衬衫", imageUrl: "", parentId: "1" },
  { id: "1-4", name: "裤子", imageUrl: "", parentId: "1" },
  { id: "1-5", name: "外套", imageUrl: "", parentId: "1" },
  { id: "1-6", name: "半身裙", imageUrl: "", parentId: "1" },
  { id: "2-1", name: "衬衫", imageUrl: "", parentId: "2" },
  { id: "2-2", name: "T恤", imageUrl: "", parentId: "2" },
  { id: "2-3", name: "裤子", imageUrl: "", parentId: "2" },
  { id: "2-4", name: "外套", imageUrl: "", parentId: "2" },
  { id: "2-5", name: "卫衣", imageUrl: "", parentId: "2" },
  { id: "2-6", name: "夹克", imageUrl: "", parentId: "2" },
  { id: "3-1", name: "运动鞋", imageUrl: "", parentId: "3" },
  { id: "3-2", name: "休闲鞋", imageUrl: "", parentId: "3" },
  { id: "3-3", name: "皮鞋", imageUrl: "", parentId: "3" },
  { id: "3-4", name: "靴子", imageUrl: "", parentId: "3" },
];


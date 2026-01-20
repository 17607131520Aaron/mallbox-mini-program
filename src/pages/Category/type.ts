// 轮播图数据类型

// 商品数据类型
export interface IProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

// 一级分类类型
export interface IMainCategory {
  id: string;
  name: string;
}

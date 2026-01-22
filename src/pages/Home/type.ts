export interface IBannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
}

export interface ICategoryItem {
  id: string;
  name: string;
  icon: string;
}

export interface IProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

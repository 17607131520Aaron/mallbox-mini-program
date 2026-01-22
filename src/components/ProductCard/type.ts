export interface IProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

export interface IProductCardProps {
  product: IProductItem;
}

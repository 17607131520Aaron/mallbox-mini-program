export interface IBannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
}

export interface IBannerSwiperProps {
  banners: IBannerItem[];
}

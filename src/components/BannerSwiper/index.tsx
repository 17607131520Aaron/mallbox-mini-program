import { View, Swiper, SwiperItem, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

interface BannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
}

interface BannerSwiperProps {
  banners: BannerItem[];
}

const BannerSwiper = ({ banners }: BannerSwiperProps): JSX.Element => {
  const handleBannerClick = (banner: BannerItem): void => {
    if (banner.linkUrl) {
      Taro.showToast({
        title: "跳转功能开发中",
        icon: "none",
      });
    }
  };

  if (banners.length === 0) {
    return <View />;
  }

  return (
    <View className="banner-swiper">
      <Swiper
        className="swiper"
        indicatorColor="rgba(255, 255, 255, 0.5)"
        indicatorActiveColor="#fff"
        circular
        autoplay
        interval={3000}
        duration={500}
        indicatorDots
      >
        {banners.map((banner) => (
          <SwiperItem key={banner.id}>
            <View
              className="swiper-item"
              onClick={() => handleBannerClick(banner)}
            >
              <View className="banner-placeholder">
                <Text className="banner-text">轮播图 {banner.id}</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};

export default BannerSwiper;


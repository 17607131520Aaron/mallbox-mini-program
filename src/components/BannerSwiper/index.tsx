import { View, Swiper, SwiperItem, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import type { IBannerItem, IBannerSwiperProps } from "./type";
import "./index.scss";

const BannerSwiper = ({ banners }: IBannerSwiperProps): JSX.Element => {
  const handleBannerClick = (banner: IBannerItem): void => {
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
        autoplay
        circular
        indicatorDots
        className="swiper"
        duration={500}
        indicatorActiveColor="#fff"
        indicatorColor="rgba(255, 255, 255, 0.5)"
        interval={3000}
      >
        {banners.map((banner) => (
          <SwiperItem key={banner.id}>
            <View className="swiper-item" onClick={() => handleBannerClick(banner)}>
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

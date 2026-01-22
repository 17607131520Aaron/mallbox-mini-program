import { View, ScrollView } from "@tarojs/components";

import { useState, useEffect } from "react";

import BannerSwiper from "@/components/BannerSwiper";
import CategoryGrid from "@/components/CategoryGrid";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";

import type { IBannerItem, ICategoryItem, IProductItem } from "./type";
import "./index.scss";

const Home = (): JSX.Element => {
  const [banners, setBanners] = useState<IBannerItem[]>([]);
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [products, setProducts] = useState<IProductItem[]>([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = (): void => {
    // 模拟数据加载
    setBanners([
      { id: "1", imageUrl: "", linkUrl: "" },
      { id: "2", imageUrl: "", linkUrl: "" },
      { id: "3", imageUrl: "", linkUrl: "" },
    ]);

    setCategories([
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
    ]);

    setProducts([
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
    ]);
  };

  return (
    <View className="home-page">
      <ScrollView scrollY>
        <SearchBar />
        <BannerSwiper banners={banners} />
        <CategoryGrid categories={categories} />
        <ProductList products={products} />
      </ScrollView>
    </View>
  );
};

export default Home;

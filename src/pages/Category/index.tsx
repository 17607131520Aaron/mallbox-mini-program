import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";

import { useState, useEffect } from "react";

import homeServices from "@/services/homeService";

import type { IMainCategory, IProductItem } from "./type";

import "./index.scss";

const Category = (): JSX.Element => {
  const [mainCategories, setMainCategories] = useState<IMainCategory[]>([]);
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [selectedMainId, setSelectedMainId] = useState<string>("");

  useEffect(() => {
    loadCategoryData();
  }, []);

  const loadCategoryData = (): void => {
    //获取分类列表
    const categories = homeServices.getCategories();
    setMainCategories(categories);
    if (categories.length > 0) {
      setSelectedMainId(categories[0].id);
      // 获取第一个分类下的商品（生成100个）
      const productList = homeServices.getProductsByCategory(categories[0].id, 100);
      setProducts(productList);
    }
  };

  const handleMainCategoryClick = (id: string): void => {
    setSelectedMainId(id);
    // 切换分类时加载对应的商品（生成100个）
    const productList = homeServices.getProductsByCategory(id, 100);
    setProducts(productList);
  };

  //点击商品进入详情()
  const handleProductClick = (id: string): void => {
    Taro.showToast({
      title: `商品详情开发中${id}`,
      icon: "none",
    });
  };

  return (
    <View className="category-page">
      <View className="main-category-list">
        <ScrollView scrollY className="main-scroll">
          {mainCategories.map((item) => {
            return (
              <View
                key={item.id}
                className={`main-item ${selectedMainId === item.id ? "active" : ""}`}
                onClick={() => handleMainCategoryClick(item.id)}
              >
                <Text className="main-item-title">{item.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View className="sub-category-list">
        <ScrollView scrollY className="main-scroll">
          <View className="sub-grid">
            {products.map((item) => {
              return (
                <View key={item.id} className="sub-item" onClick={() => handleProductClick(item.id)}>
                  <View className="sub-image">
                    <Text className="placeholder">图</Text>
                  </View>
                  <Text className="sub-name">{item.name}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;

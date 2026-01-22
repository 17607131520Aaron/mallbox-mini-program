import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import type { ICategoryItem, ICategoryGridProps } from "./type";
import "./index.scss";

const CategoryGrid = ({ categories }: ICategoryGridProps): JSX.Element => {
  const handleCategoryClick = (category: ICategoryItem): void => {
    Taro.showToast({
      title: `点击了${category.name}`,
      icon: "none",
    });
  };

  if (categories.length === 0) {
    return <View />;
  }

  return (
    <View className="category-grid">
      {categories.map((category) => (
        <View key={category.id} className="category-item" onClick={() => handleCategoryClick(category)}>
          <View className="category-icon">
            <Text className="icon-text">{category.icon}</Text>
          </View>
          <Text className="category-name">{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryGrid;

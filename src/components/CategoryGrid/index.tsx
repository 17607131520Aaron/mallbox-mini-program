import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

const CategoryGrid = ({ categories }: CategoryGridProps): JSX.Element => {
  const handleCategoryClick = (category: CategoryItem): void => {
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
        <View
          key={category.id}
          className="category-item"
          onClick={() => handleCategoryClick(category)}
        >
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

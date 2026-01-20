import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const SearchBar = (): JSX.Element => {
  const handleClick = (): void => {
    Taro.showToast({
      title: "搜索功能开发中",
      icon: "none",
    });
  };

  return (
    <View className="search-bar">
      <View className="search-input" onClick={handleClick}>
        <Text className="search-icon">🔍</Text>
        <Text className="placeholder">搜索商品</Text>
      </View>
    </View>
  );
};

export default SearchBar;

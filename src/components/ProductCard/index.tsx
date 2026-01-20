import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

interface ProductCardProps {
  product: ProductItem;
}

const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  const handleClick = (): void => {
    Taro.showToast({
      title: "商品详情开发中",
      icon: "none",
    });
  };

  return (
    <View className="product-card" onClick={handleClick}>
      <View className="product-image">
        <Text className="image-placeholder">图片</Text>
      </View>
      <View className="product-info">
        <Text className="product-name">{product.name}</Text>
        <View className="price-row">
          <Text className="price">¥{product.price}</Text>
          {product.originalPrice && (
            <Text className="original-price">¥{product.originalPrice}</Text>
          )}
        </View>
        <Text className="sales">已售{product.sales}件</Text>
      </View>
    </View>
  );
};

export default ProductCard;

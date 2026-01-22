import { View, Text } from "@tarojs/components";

import ProductCard from "@/components/ProductCard";

import type { IProductListProps } from "./type";
import "./index.scss";

const ProductList = ({ products, title = "推荐商品" }: IProductListProps): JSX.Element => {
  if (products.length === 0) {
    return <View />;
  }

  return (
    <View className="product-list">
      <View className="list-header">
        <Text className="list-title">{title}</Text>
      </View>
      <View className="product-grid">
        {products.map((product) => (
          <View key={product.id} className="grid-item">
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProductList;

import { View, Text } from "@tarojs/components";
import ProductCard from "../ProductCard";
import "./index.scss";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  sales: number;
}

interface ProductListProps {
  products: ProductItem[];
  title?: string;
}

const ProductList = ({ products, title = "推荐商品" }: ProductListProps): JSX.Element => {
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


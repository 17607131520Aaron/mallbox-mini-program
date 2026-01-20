import { View, Text, ScrollView } from "@tarojs/components";

import { useState, useEffect } from "react";

import homeService from "@/services/homeService/services";

import type { ICartItem } from "./type";
import "./index.scss";

const Cart = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = (): void => {
    const items = homeService.getCartItems();
    setCartItems(items);
  };

  const toggleItem = (id: string): void => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  };

  const toggleAll = (): void => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems(cartItems.map((item) => ({ ...item, selected: !allSelected })));
  };

  const updateQuantity = (id: string, delta: number): void => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const selectedItems = cartItems.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);

  return (
    <View className="cart-page">
      <View className="cart-list">
        <ScrollView scrollY className="main-scroll">
          {cartItems.map((item) => (
            <View key={item.id} className="cart-item">
              <View className={`checkbox ${item.selected ? "checked" : ""}`} onClick={() => toggleItem(item.id)}>
                {item.selected && <Text>✓</Text>}
              </View>
              <View className="item-image">
                <Text>图片</Text>
              </View>
              <View className="item-info">
                <Text className="item-name">{item.name}</Text>
                <View className="item-bottom">
                  <Text className="item-price">¥{item.price}</Text>
                  <View className="quantity-control">
                    <View
                      className={`btn ${item.quantity <= 1 ? "disabled" : ""}`}
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Text>-</Text>
                    </View>
                    <Text className="quantity">{item.quantity}</Text>
                    <View className="btn" onClick={() => updateQuantity(item.id, 1)}>
                      <Text>+</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="cart-footer">
        <View className="footer-left">
          <View className={`checkbox-all ${allSelected ? "checked" : ""}`} onClick={toggleAll}>
            {allSelected && <Text>✓</Text>}
          </View>
          <View className="total-info">
            <Text className="total-label">合计: </Text>
            <Text className="total-price">¥{totalPrice.toFixed(2)}</Text>
          </View>
        </View>
        <View className={`checkout-btn ${selectedItems.length === 0 ? "disabled" : ""}`}>
          <Text>结算({selectedItems.length})</Text>
        </View>
      </View>
    </View>
  );
};

export default Cart;

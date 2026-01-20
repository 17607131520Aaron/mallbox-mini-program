import { View, Text, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";

import { useState, useEffect } from "react";

import { mockUserInfo, mockOrderStats } from "../../mock/data";

import type { UserInfo, OrderStats } from "../../types";
import "./index.scss";

const Profile = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [orderStats, setOrderStats] = useState<OrderStats>({
    unpaid: 0,
    unshipped: 0,
    unreceived: 0,
    uncommented: 0,
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = (): void => {
    setUserInfo(mockUserInfo);
    setOrderStats(mockOrderStats);
  };

  const handleOrderClick = (type: string): void => {
    Taro.showToast({
      title: `${type}功能开发中`,
      icon: "none",
    });
  };

  const handleFunctionClick = (text: string): void => {
    Taro.showToast({
      title: `${text}功能开发中`,
      icon: "none",
    });
  };

  const functionList = [
    { icon: "📍", text: "收货地址" },
    { icon: "🎫", text: "优惠券" },
    { icon: "⭐", text: "我的收藏" },
    { icon: "👁️", text: "浏览记录" },
    { icon: "💬", text: "联系客服" },
    { icon: "⚙️", text: "设置" },
  ];

  return (
    <View className="profile-page">
      <ScrollView scrollY>
        <View className="user-header">
          <View className="avatar">
            <Text>👤</Text>
          </View>
          <View className="user-info">
            <Text className="nickname">{userInfo?.nickname || "用户昵称"}</Text>
            <Text className="user-id">ID: {userInfo?.id || "user123"}</Text>
          </View>
        </View>

        <View className="order-section">
          <View className="section-title">
            <Text>我的订单</Text>
            <Text className="view-all">查看全部 &gt;</Text>
          </View>
          <View className="order-list">
            <View className="order-item" onClick={() => handleOrderClick("待付款")}>
              <View className="order-icon">
                <Text>💰</Text>
                {orderStats.unpaid > 0 && (
                  <View className="badge">
                    <Text>{orderStats.unpaid}</Text>
                  </View>
                )}
              </View>
              <Text className="order-text">待付款</Text>
            </View>
            <View className="order-item" onClick={() => handleOrderClick("待发货")}>
              <View className="order-icon">
                <Text>📦</Text>
                {orderStats.unshipped > 0 && (
                  <View className="badge">
                    <Text>{orderStats.unshipped}</Text>
                  </View>
                )}
              </View>
              <Text className="order-text">待发货</Text>
            </View>
            <View className="order-item" onClick={() => handleOrderClick("待收货")}>
              <View className="order-icon">
                <Text>🚚</Text>
                {orderStats.unreceived > 0 && (
                  <View className="badge">
                    <Text>{orderStats.unreceived}</Text>
                  </View>
                )}
              </View>
              <Text className="order-text">待收货</Text>
            </View>
            <View className="order-item" onClick={() => handleOrderClick("待评价")}>
              <View className="order-icon">
                <Text>✍️</Text>
                {orderStats.uncommented > 0 && (
                  <View className="badge">
                    <Text>{orderStats.uncommented}</Text>
                  </View>
                )}
              </View>
              <Text className="order-text">待评价</Text>
            </View>
          </View>
        </View>

        <View className="function-section">
          {functionList.map((item, index) => (
            <View key={index} className="function-item" onClick={() => handleFunctionClick(item.text)}>
              <View className="item-left">
                <View className="item-icon">
                  <Text>{item.icon}</Text>
                </View>
                <Text className="item-text">{item.text}</Text>
              </View>
              <Text className="arrow">&gt;</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

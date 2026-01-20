import { View, Text, ScrollView } from "@tarojs/components";
import { useState, useEffect } from "react";
import { mockMainCategories, mockSubCategories } from "../../mock/data";
import type { MainCategory, SubCategory } from "../../types";
import "./index.scss";

const Category = (): JSX.Element => {
  const [mainCategories, setMainCategories] = useState<MainCategory[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedMainId, setSelectedMainId] = useState<string>("");

  useEffect(() => {
    loadCategoryData();
  }, []);

  const loadCategoryData = (): void => {
    setMainCategories(mockMainCategories);
    setSubCategories(mockSubCategories);
    if (mockMainCategories.length > 0) {
      setSelectedMainId(mockMainCategories[0].id);
    }
  };

  const handleMainCategoryClick = (id: string): void => {
    setSelectedMainId(id);
  };

  const filteredSubCategories = subCategories.filter(
    (sub) => sub.parentId === selectedMainId
  );

  return (
    <View className="category-page">
      <View className="main-category-list">
        <ScrollView scrollY className="main-scroll">
          {mainCategories.map((item) => (
            <View
              key={item.id}
              className={`main-item ${selectedMainId === item.id ? "active" : ""}`}
              onClick={() => handleMainCategoryClick(item.id)}
            >
              <Text>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View className="sub-category-list">
        <ScrollView scrollY className="sub-scroll">
          <View className="sub-grid">
            {filteredSubCategories.map((item) => (
              <View key={item.id} className="sub-item">
                <View className="sub-image">
                  <Text className="placeholder">图</Text>
                </View>
                <Text className="sub-name">{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;


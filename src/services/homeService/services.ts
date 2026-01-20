import type { ProductItem } from "@/types";

// Mock数据生成类（内部使用，不对外暴露）
class MockDataGenerator {
  // 固定的分类数据
  private categories = [
    { id: "1", name: "女装" },
    { id: "2", name: "男装" },
    { id: "3", name: "手机" },
    { id: "4", name: "家电" },
    { id: "5", name: "美妆" },
    { id: "6", name: "鞋靴" },
    { id: "7", name: "箱包" },
    { id: "8", name: "数码" },
    { id: "9", name: "运动" },
    { id: "10", name: "食品" },
  ];

  // 分类对应的商品模板
  private productTemplates: Record<string, string[]> = {
    "1": ["连衣裙", "半身裙", "T恤", "衬衫", "针织衫", "外套", "牛仔裤", "打底裤", "风衣", "毛衣"],
    "2": ["衬衫", "T恤", "夹克", "西装", "牛仔裤", "休闲裤", "卫衣", "POLO衫", "毛衣", "外套"],
    "3": ["iPhone 15", "小米14", "华为Mate60", "OPPO Find X7", "vivo X100", "一加12", "荣耀Magic6", "三星S24"],
    "4": ["电视", "冰箱", "洗衣机", "空调", "热水器", "微波炉", "电饭煲", "吸尘器", "空气净化器", "加湿器"],
    "5": ["口红", "粉底液", "眼影盘", "面膜", "精华液", "乳液", "洗面奶", "防晒霜", "香水", "卸妆水"],
    "6": ["运动鞋", "休闲鞋", "皮鞋", "高跟鞋", "靴子", "凉鞋", "帆布鞋", "板鞋", "拖鞋", "雪地靴"],
    "7": ["双肩包", "单肩包", "手提包", "钱包", "旅行箱", "腰包", "公文包", "化妆包", "卡包", "登机箱"],
    "8": ["蓝牙耳机", "机械键盘", "鼠标", "充电宝", "数据线", "移动硬盘", "U盘", "平板电脑", "智能手表", "音箱"],
    "9": ["篮球鞋", "跑步鞋", "瑜伽垫", "哑铃", "跳绳", "运动背包", "护腕", "运动水杯", "健身手套", "运动毛巾"],
    "10": ["零食大礼包", "坚果", "巧克力", "饼干", "糖果", "果干", "薯片", "牛肉干", "海苔", "蜜饯"],
  };

  // 品牌前缀
  private brands = ["优选", "精品", "热销", "爆款", "新款", "经典", "时尚", "高端", "品质", "潮流"];

  public getCategories(): Array<{ id: string; name: string }> {
    return this.categories;
  }

  public generateProductsByCategory(categoryId: string, count: number): ProductItem[] {
    const templates = this.productTemplates[categoryId] || ["商品"];
    const products: ProductItem[] = [];

    for (let i = 0; i < count; i++) {
      const template = templates[i % templates.length];
      const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
      const price = Math.floor(Math.random() * 500) + 10;
      const hasDiscount = Math.random() > 0.6;
      const originalPrice = hasDiscount ? Math.floor(price * (1 + Math.random() * 0.5 + 0.2)) : undefined;

      products.push({
        id: `${categoryId}-${i + 1}`,
        name: `${brand}${template}`,
        price,
        originalPrice,
        imageUrl: `https://via.placeholder.com/300x300?text=${encodeURIComponent(template)}`,
        sales: Math.floor(Math.random() * 10000) + 100,
      });
    }

    return products;
  }
}

class homeServices {
  private mockGenerator = new MockDataGenerator();

  //查询分类列表
  public getCategories(): Array<{ id: string; name: string }> {
    return this.mockGenerator.getCategories();
  }

  //查询对应分类中的商品
  public getProductsByCategory(categoryId: string, count = 20): ProductItem[] {
    return this.mockGenerator.generateProductsByCategory(categoryId, count);
  }
}

export default new homeServices();

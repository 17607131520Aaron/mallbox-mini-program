import type { ProductItem, CartItem } from "@/types";

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

  // 分类对应的商品模板（扩展到100个）
  private productTemplates: Record<string, string[]> = {
    "1": [
      "连衣裙",
      "半身裙",
      "T恤",
      "衬衫",
      "针织衫",
      "外套",
      "牛仔裤",
      "打底裤",
      "风衣",
      "毛衣",
      "羽绒服",
      "棉服",
      "卫衣",
      "背心",
      "吊带",
      "短裤",
      "阔腿裤",
      "西装裤",
      "休闲裤",
      "运动裤",
    ],
    "2": [
      "衬衫",
      "T恤",
      "夹克",
      "西装",
      "牛仔裤",
      "休闲裤",
      "卫衣",
      "POLO衫",
      "毛衣",
      "外套",
      "羽绒服",
      "棉服",
      "风衣",
      "马甲",
      "背心",
      "短裤",
      "运动裤",
      "西裤",
      "工装裤",
      "冲锋衣",
    ],
    "3": [
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15",
      "小米14 Ultra",
      "小米14 Pro",
      "小米14",
      "华为Mate60 Pro+",
      "华为Mate60 Pro",
      "华为Mate60",
      "OPPO Find X7 Ultra",
      "OPPO Find X7",
      "vivo X100 Pro",
      "vivo X100",
      "一加12",
      "荣耀Magic6 Pro",
      "荣耀Magic6",
      "三星S24 Ultra",
      "三星S24+",
      "三星S24",
      "realme GT5 Pro",
    ],
    "4": [
      "4K智能电视",
      "8K电视",
      "激光电视",
      "对开门冰箱",
      "三门冰箱",
      "十字对开冰箱",
      "滚筒洗衣机",
      "波轮洗衣机",
      "洗烘一体机",
      "立式空调",
      "挂式空调",
      "中央空调",
      "燃气热水器",
      "电热水器",
      "空气能热水器",
      "微波炉",
      "烤箱",
      "蒸烤一体机",
      "电饭煲",
      "破壁机",
    ],
    "5": [
      "哑光口红",
      "滋润口红",
      "唇釉",
      "唇彩",
      "粉底液",
      "气垫",
      "遮瑕膏",
      "散粉",
      "眼影盘",
      "眼线笔",
      "睫毛膏",
      "眉笔",
      "腮红",
      "高光",
      "修容粉",
      "补水面膜",
      "清洁面膜",
      "美白精华",
      "抗老精华",
      "保湿乳液",
    ],
    "6": [
      "跑步鞋",
      "篮球鞋",
      "板鞋",
      "帆布鞋",
      "小白鞋",
      "老爹鞋",
      "高帮鞋",
      "低帮鞋",
      "休闲鞋",
      "皮鞋",
      "商务皮鞋",
      "高跟鞋",
      "平底鞋",
      "单鞋",
      "短靴",
      "长靴",
      "雪地靴",
      "马丁靴",
      "凉鞋",
      "拖鞋",
    ],
    "7": [
      "双肩包",
      "单肩包",
      "斜挎包",
      "手提包",
      "托特包",
      "水桶包",
      "链条包",
      "腰包",
      "胸包",
      "钱包",
      "长款钱包",
      "短款钱包",
      "卡包",
      "20寸行李箱",
      "24寸行李箱",
      "28寸行李箱",
      "登机箱",
      "旅行包",
      "化妆包",
      "公文包",
    ],
    "8": [
      "真无线蓝牙耳机",
      "头戴式耳机",
      "颈挂式耳机",
      "机械键盘",
      "薄膜键盘",
      "无线键盘",
      "游戏鼠标",
      "办公鼠标",
      "无线鼠标",
      "20000mAh充电宝",
      "10000mAh充电宝",
      "快充充电宝",
      "Type-C数据线",
      "Lightning数据线",
      "1TB移动硬盘",
      "2TB移动硬盘",
      "128GB U盘",
      "256GB U盘",
      "iPad",
      "华为平板",
    ],
    "9": [
      "篮球鞋",
      "足球鞋",
      "跑步鞋",
      "训练鞋",
      "瑜伽垫",
      "加厚瑜伽垫",
      "可调节哑铃",
      "固定哑铃",
      "跳绳",
      "计数跳绳",
      "运动背包",
      "健身包",
      "护腕",
      "护膝",
      "运动水杯",
      "摇摇杯",
      "健身手套",
      "运动毛巾",
      "瑜伽服",
      "速干衣",
    ],
    "10": [
      "坚果礼盒",
      "混合坚果",
      "夏威夷果",
      "碧根果",
      "巴旦木",
      "腰果",
      "开心果",
      "黑巧克力",
      "牛奶巧克力",
      "白巧克力",
      "曲奇饼干",
      "威化饼干",
      "苏打饼干",
      "软糖",
      "硬糖",
      "棒棒糖",
      "芒果干",
      "葡萄干",
      "蔓越莓干",
      "薯片",
    ],
  };

  // 品牌前缀（扩展）
  private brands = [
    "优选",
    "精品",
    "热销",
    "爆款",
    "新款",
    "经典",
    "时尚",
    "高端",
    "品质",
    "潮流",
    "限量",
    "特惠",
    "推荐",
    "畅销",
    "人气",
  ];

  // 商品描述词
  private descriptions = [
    "春季新款",
    "夏季热卖",
    "秋冬必备",
    "限时特惠",
    "品质保证",
    "官方正品",
    "包邮",
    "买一送一",
    "第二件半价",
  ];

  // 价格区间配置
  private priceRanges: Record<string, { min: number; max: number }> = {
    "1": { min: 59, max: 599 },
    "2": { min: 79, max: 799 },
    "3": { min: 1999, max: 9999 },
    "4": { min: 299, max: 8999 },
    "5": { min: 29, max: 899 },
    "6": { min: 89, max: 1299 },
    "7": { min: 99, max: 2999 },
    "8": { min: 49, max: 3999 },
    "9": { min: 39, max: 899 },
    "10": { min: 9, max: 299 },
  };

  public getCategories(): Array<{ id: string; name: string }> {
    return this.categories;
  }

  public generateProductsByCategory(categoryId: string, count: number): ProductItem[] {
    const templates = this.productTemplates[categoryId] || ["商品"];
    const priceRange = this.priceRanges[categoryId] || { min: 10, max: 500 };
    const products: ProductItem[] = [];

    for (let i = 0; i < count; i++) {
      const template = templates[i % templates.length];
      const brand = this.brands[i % this.brands.length];
      const description = this.descriptions[i % this.descriptions.length];

      // 生成更真实的价格
      const price = Math.floor(Math.random() * (priceRange.max - priceRange.min) + priceRange.min);
      const roundedPrice = Math.round(price / 10) * 10 - 1; // 价格尾数为9

      // 40%概率有折扣
      const hasDiscount = Math.random() > 0.6;
      const originalPrice = hasDiscount ? Math.floor(roundedPrice * (1.2 + Math.random() * 0.5)) : undefined;

      // 生成更真实的销量
      const salesBase = Math.floor(Math.random() * 50000) + 100;
      const sales = Math.round(salesBase / 100) * 100; // 销量取整百

      products.push({
        id: `${categoryId}-${i + 1}`,
        name: `${description} ${brand}${template}`,
        price: roundedPrice,
        originalPrice,
        imageUrl: `https://via.placeholder.com/300x300?text=${encodeURIComponent(template)}`,
        sales,
      });
    }

    return products;
  }

  public generateCartItems(): CartItem[] {
    // 生成10个购物车商品，来自不同分类
    const cartProducts = [
      { categoryId: "1", template: "连衣裙", priceRange: { min: 159, max: 299 } },
      { categoryId: "1", template: "针织衫", priceRange: { min: 89, max: 199 } },
      { categoryId: "2", template: "衬衫", priceRange: { min: 129, max: 259 } },
      { categoryId: "3", template: "iPhone 15", priceRange: { min: 5999, max: 5999 } },
      { categoryId: "4", template: "电饭煲", priceRange: { min: 299, max: 599 } },
      { categoryId: "5", template: "口红", priceRange: { min: 79, max: 199 } },
      { categoryId: "5", template: "面膜", priceRange: { min: 39, max: 129 } },
      { categoryId: "6", template: "运动鞋", priceRange: { min: 259, max: 599 } },
      { categoryId: "8", template: "蓝牙耳机", priceRange: { min: 99, max: 399 } },
      { categoryId: "10", template: "坚果礼盒", priceRange: { min: 49, max: 129 } },
    ];

    return cartProducts.map((product, index) => {
      const brand = this.brands[index % this.brands.length];
      const description = this.descriptions[index % this.descriptions.length];
      const price = Math.floor(
        Math.random() * (product.priceRange.max - product.priceRange.min) + product.priceRange.min,
      );
      const roundedPrice = Math.round(price / 10) * 10 - 1;

      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3个
      const selected = index < 7; // 前7个默认选中

      return {
        id: `cart-${index + 1}`,
        productId: `${product.categoryId}-${index + 1}`,
        name: `${description} ${brand}${product.template}`,
        price: roundedPrice,
        quantity,
        imageUrl: `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.template)}`,
        selected,
      };
    });
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

  //查询购物车数据
  public getCartItems(): CartItem[] {
    return this.mockGenerator.generateCartItems();
  }
}

export default new homeServices();

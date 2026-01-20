# 设计文档

## 概述

本设计文档描述了电商商城首页及底部Tab栏系统的技术实现方案。系统基于Taro框架，使用React + TypeScript开发，支持微信小程序平台。核心功能包括底部Tab栏导航、首页内容展示、分类页、购物车页和个人中心页。

## 架构

### 整体架构

```
商城应用
├── 应用配置层 (app.config.ts)
│   ├── 页面路由注册
│   └── TabBar配置
├── 页面层
│   ├── 首页 (Home)
│   ├── 分类页 (Category)
│   ├── 购物车页 (Cart)
│   └── 我的页 (Profile)
└── 组件层
    ├── 搜索栏组件
    ├── 轮播图组件
    ├── 商品卡片组件
    └── 分类网格组件
```

### 技术栈

- **框架**: Taro 4.1.10
- **UI库**: @tarojs/components
- **状态管理**: Zustand (已安装)
- **语言**: TypeScript
- **样式**: SCSS

## 组件和接口

### 1. 应用配置 (app.config.ts)

```typescript
export default defineAppConfig({
  pages: [
    'pages/Home/index',
    'pages/Category/index',
    'pages/Cart/index',
    'pages/Profile/index',
    'pages/Login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '商城',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#ff6b6b',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/Home/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/Category/index',
        text: '分类',
        iconPath: 'assets/icons/category.png',
        selectedIconPath: 'assets/icons/category-active.png'
      },
      {
        pagePath: 'pages/Cart/index',
        text: '购物车',
        iconPath: 'assets/icons/cart.png',
        selectedIconPath: 'assets/icons/cart-active.png'
      },
      {
        pagePath: 'pages/Profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  }
})
```

### 2. 首页组件 (Home)

**接口定义:**

```typescript
// 轮播图数据
interface BannerItem {
  id: string
  imageUrl: string
  linkUrl?: string
}

// 分类数据
interface CategoryItem {
  id: string
  name: string
  icon: string
}

// 商品数据
interface ProductItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  sales: number
}

// 首页状态
interface HomeState {
  banners: BannerItem[]
  categories: CategoryItem[]
  products: ProductItem[]
  loading: boolean
}
```

**组件结构:**

```typescript
const Home: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    banners: [],
    categories: [],
    products: [],
    loading: true
  })

  // 页面加载时获取数据
  useEffect(() => {
    loadHomeData()
  }, [])

  return (
    <View className="home-page">
      <SearchBar />
      <Swiper banners={state.banners} />
      <CategoryGrid categories={state.categories} />
      <ProductList products={state.products} />
    </View>
  )
}
```

### 3. 分类页组件 (Category)

**接口定义:**

```typescript
// 一级分类
interface MainCategory {
  id: string
  name: string
}

// 二级分类
interface SubCategory {
  id: string
  name: string
  imageUrl: string
  parentId: string
}

// 分类页状态
interface CategoryState {
  mainCategories: MainCategory[]
  subCategories: SubCategory[]
  selectedMainId: string
}
```

**组件结构:**

```typescript
const Category: React.FC = () => {
  const [state, setState] = useState<CategoryState>({
    mainCategories: [],
    subCategories: [],
    selectedMainId: ''
  })

  return (
    <View className="category-page">
      <View className="main-category-list">
        {/* 左侧一级分类 */}
      </View>
      <View className="sub-category-list">
        {/* 右侧二级分类 */}
      </View>
    </View>
  )
}
```

### 4. 购物车页组件 (Cart)

**接口定义:**

```typescript
// 购物车商品
interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  selected: boolean
}

// 购物车状态
interface CartState {
  items: CartItem[]
  totalPrice: number
  selectedCount: number
}
```

**组件结构:**

```typescript
const Cart: React.FC = () => {
  const [state, setState] = useState<CartState>({
    items: [],
    totalPrice: 0,
    selectedCount: 0
  })

  return (
    <View className="cart-page">
      {state.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartItemList items={state.items} />
          <CartFooter 
            totalPrice={state.totalPrice}
            selectedCount={state.selectedCount}
          />
        </>
      )}
    </View>
  )
}
```

### 5. 个人中心页组件 (Profile)

**接口定义:**

```typescript
// 用户信息
interface UserInfo {
  id: string
  nickname: string
  avatar: string
}

// 订单统计
interface OrderStats {
  unpaid: number
  unshipped: number
  unreceived: number
  uncommented: number
}

// 个人中心状态
interface ProfileState {
  userInfo: UserInfo | null
  orderStats: OrderStats
}
```

**组件结构:**

```typescript
const Profile: React.FC = () => {
  const [state, setState] = useState<ProfileState>({
    userInfo: null,
    orderStats: {
      unpaid: 0,
      unshipped: 0,
      unreceived: 0,
      uncommented: 0
    }
  })

  return (
    <View className="profile-page">
      <UserHeader userInfo={state.userInfo} />
      <OrderSection stats={state.orderStats} />
      <FunctionList />
    </View>
  )
}
```

## 数据模型

### 页面路由模型

```typescript
interface PageRoute {
  path: string
  name: string
  isTabBar: boolean
}

const routes: PageRoute[] = [
  { path: 'pages/Home/index', name: '首页', isTabBar: true },
  { path: 'pages/Category/index', name: '分类', isTabBar: true },
  { path: 'pages/Cart/index', name: '购物车', isTabBar: true },
  { path: 'pages/Profile/index', name: '我的', isTabBar: true },
  { path: 'pages/Login/index', name: '登录', isTabBar: false }
]
```

### TabBar配置模型

```typescript
interface TabBarItem {
  pagePath: string
  text: string
  iconPath: string
  selectedIconPath: string
}

interface TabBarConfig {
  color: string
  selectedColor: string
  backgroundColor: string
  borderStyle: 'black' | 'white'
  list: TabBarItem[]
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: Tab栏页面切换一致性

*对于任意* Tab项，当用户点击该Tab项时，系统应该切换到对应的页面，并且Tab栏应该高亮显示该Tab项

**验证: 需求 1.3, 1.4**

### 属性 2: 默认页面加载

*对于任意* 应用启动场景，系统应该默认加载并显示首页

**验证: 需求 2.1, 6.3**

### 属性 3: Tab栏固定显示

*对于任意* Tab页面，Tab栏应该始终固定在页面底部，不随页面内容滚动而移动

**验证: 需求 1.5**

### 属性 4: 页面路由注册完整性

*对于任意* Tab栏中配置的页面路径，该路径应该在应用的pages配置中已注册

**验证: 需求 6.1**

### 属性 5: 购物车空状态处理

*对于任意* 购物车状态，当购物车商品列表为空时，应该显示空状态提示而不是商品列表

**验证: 需求 4.2**

## 错误处理

### 1. 页面加载失败

- 当页面数据加载失败时，显示错误提示和重试按钮
- 记录错误日志用于问题排查

### 2. 图片加载失败

- 为所有图片设置默认占位图
- 图片加载失败时显示占位图

### 3. 网络请求失败

- 实现请求重试机制（最多3次）
- 显示友好的错误提示信息
- 提供手动刷新功能

### 4. 路由跳转失败

- 捕获路由跳转异常
- 回退到上一个有效页面
- 记录错误日志

## 测试策略

### 单元测试

- 测试各个页面组件的渲染
- 测试状态管理逻辑
- 测试数据格式化函数
- 测试边界条件（空数据、异常数据）

### 属性测试

使用 **fast-check** 库进行属性测试（TypeScript/JavaScript的属性测试库）。每个属性测试应该运行至少100次迭代。

**测试配置:**

```typescript
import fc from 'fast-check'

// 每个属性测试的配置
const testConfig = {
  numRuns: 100, // 最少100次迭代
  verbose: true
}
```

**属性测试用例:**

1. **属性 1 测试**: 生成随机Tab索引，验证点击后页面路径和高亮状态的一致性
   - 标签: **Feature: mall-homepage-with-tabbar, Property 1: Tab栏页面切换一致性**

2. **属性 2 测试**: 验证应用启动时默认加载首页
   - 标签: **Feature: mall-homepage-with-tabbar, Property 2: 默认页面加载**

3. **属性 4 测试**: 生成随机TabBar配置，验证所有Tab页面路径都在pages配置中
   - 标签: **Feature: mall-homepage-with-tabbar, Property 4: 页面路由注册完整性**

4. **属性 5 测试**: 生成随机购物车状态（包括空数组），验证空状态时显示空提示
   - 标签: **Feature: mall-homepage-with-tabbar, Property 5: 购物车空状态处理**

### 集成测试

- 测试Tab栏切换流程
- 测试页面间的数据传递
- 测试完整的用户操作流程

### 测试方法平衡

- **单元测试**: 专注于具体示例、边界情况和错误条件
- **属性测试**: 通过随机化验证通用属性，覆盖大量输入场景
- 两者互补，共同提供全面的测试覆盖

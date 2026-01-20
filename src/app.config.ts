export default defineAppConfig({
  pages: [
    "pages/Home/index",
    "pages/Category/index",
    "pages/Cart/index",
    "pages/Profile/index",
    "pages/Login/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "商城",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999",
    selectedColor: "#ff6b6b",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/Home/index",
        text: "首页",
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home-active.png",
      },
      {
        pagePath: "pages/Category/index",
        text: "分类",
        iconPath: "assets/icons/category.png",
        selectedIconPath: "assets/icons/category-active.png",
      },
      {
        pagePath: "pages/Cart/index",
        text: "购物车",
        iconPath: "assets/icons/cart.png",
        selectedIconPath: "assets/icons/cart-active.png",
      },
      {
        pagePath: "pages/Profile/index",
        text: "我的",
        iconPath: "assets/icons/profile.png",
        selectedIconPath: "assets/icons/profile-active.png",
      },
    ],
  },
});

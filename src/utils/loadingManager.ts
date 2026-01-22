import Taro from "@tarojs/taro";

/**
 * 全局 Loading 管理器
 * 用于管理多个并发请求的 loading 状态
 */
class LoadingManager {
  private requestCount = 0;
  private isLoading = false;

  /**
   * 显示 loading
   */
  public show(title = "加载中..."): void {
    this.requestCount++;

    if (!this.isLoading) {
      this.isLoading = true;
      Taro.showLoading({
        title,
        mask: true,
      });
    }
  }

  /**
   * 隐藏 loading
   */
  public hide(): void {
    this.requestCount--;

    // 当所有请求都完成时，才隐藏 loading
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.isLoading = false;
      Taro.hideLoading();
    }
  }

  /**
   * 强制隐藏 loading（用于异常情况）
   */
  public forceHide(): void {
    this.requestCount = 0;
    this.isLoading = false;
    Taro.hideLoading();
  }

  /**
   * 获取当前请求数量
   */
  public getRequestCount(): number {
    return this.requestCount;
  }
}

export default new LoadingManager();

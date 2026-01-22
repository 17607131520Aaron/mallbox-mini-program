import Taro from "@tarojs/taro";

import { clearLoginStatus } from "./auth";
import loadingManager from "./loadingManager";

const getToken = (): string | null => {
  return null;
};

/**
 * 后端统一响应格式
 */
export interface IResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

/**
 * 错误消息接口
 */
export interface IErrorMessage {
  message: string;
  description: string;
  action?: () => void | Promise<void>;
}

/**
 * 请求配置接口
 */
export interface IRequestConfig<T = unknown> {
  url: string;
  data?: T;
  handleRaw?: boolean;
  timeout?: number;
  cancelToken?: AbortController;
  retry?: number;
  showLoading?: boolean; // 是否显示 loading
  loadingText?: string; // loading 文本
}

// 业务错误类型，用于标记不应该重试的错误
interface IBusinessError extends Error {
  isBusinessError: true;
}

const DEFAULT_TIMEOUT = 5000;

// 优先从环境变量读取基础地址，未配置时回退到本地 config
const ENV_API_BASE_URL = "http://localhost:9999/storeverserepo/wx";
/**
 * 统一错误处理
 */
const handleError = async (status: number, data: IResponse): Promise<void> => {
  const errorMessages: Record<number, IErrorMessage> = {
    401: {
      message: "登录已过期",
      description: "您的登录已过期，请重新登录",
      action: async () => {
        // 清除登录信息
        clearLoginStatus();

        try {
          const res = await Taro.showModal({
            title: "登录已过期",
            content: "您的登录已过期，请重新登录",
            confirmText: "重新登录",
            cancelText: "取消",
            showCancel: true,
          });

          if (res.confirm) {
            // 用户点击重新登录，跳转到登录页
            const pages = Taro.getCurrentPages();
            const currentPage = pages[pages.length - 1];
            if (currentPage && currentPage.route !== "pages/Login/index") {
              await Taro.redirectTo({
                url: "/pages/Login/index",
              });
            }
          }
        } catch (error) {
          console.error("显示登录过期提示失败:", error);
        }
      },
    },
    403: {
      message: "权限错误",
      description: "您没有权限访问该资源",
    },
    404: {
      message: "系统提示",
      description: "访问地址不存在，请联系管理员",
    },
    500: {
      message: "系统错误",
      description: data?.message || "服务器内部错误",
    },
  };

  const error = errorMessages[status] || {
    message: "错误",
    description: data?.message || "系统异常",
  };

  // 对于 401 错误，执行 action（弹出确认框）
  if (status === 401 && error.action) {
    await error.action();
  } else {
    // 其他错误直接显示 toast
    Taro.showToast({
      title: error.description,
      icon: "none",
      duration: 2000,
    });
  }
};

/**
 * 统一响应处理
 * 注意：只有 HTTP status === 200 的响应才会到达这里
 * HTTP 错误（如 401, 403, 404, 500）会在响应拦截器中处理
 */
const parse = <R>(res: Taro.request.SuccessCallbackResult<IResponse<R>>, params: { handleRaw?: boolean }): R => {
  const { data } = res;
  const { handleRaw } = params;

  if (handleRaw) {
    return data as R;
  }

  const responseData = data as IResponse<R>;
  if (responseData.code === 0) {
    return responseData.data as R;
  }

  // code !== 0 时，这是业务逻辑错误，不应该重试
  // 直接显示业务错误消息，而不是通过 handleError（因为 HTTP status 是 200）
  Taro.showToast({
    title: responseData?.message || "业务逻辑错误",
    icon: "none",
    duration: 2000,
  });
  const businessError = new Error(responseData?.message || "请求失败") as IBusinessError;
  businessError.isBusinessError = true;
  throw businessError;
};

/**
 * 发起请求
 */
const requestMethod = async <T, R>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  config: IRequestConfig<T>,
): Promise<R> => {
  const { retry = 0, showLoading = true, loadingText = "加载中..." } = config;
  let attempts = 0;
  let lastError: unknown;

  // 显示 loading
  if (showLoading) {
    loadingManager.show(loadingText);
  }

  try {
    while (attempts <= retry) {
      try {
        const { url, data, handleRaw, timeout = DEFAULT_TIMEOUT, cancelToken } = config;

        // 构建完整URL（优先使用环境变量中的基础地址）
        const fullUrl = url.startsWith("http") ? url : `${ENV_API_BASE_URL}${url}`;

        // 获取token
        const token = getToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        // 创建请求配置
        const requestConfig: Taro.request.Option = {
          url: fullUrl,
          method,
          data: method === "GET" ? data : data,
          header: headers,
          timeout,
        };

        // 注意：Taro.request 在小程序端可能不支持 signal，这里主要是为了兼容性
        // 在 H5 环境下可以使用 signal 来取消请求
        if (cancelToken?.signal) {
          (requestConfig as unknown as Record<string, unknown>).signal = cancelToken.signal;
        }

        const response = await Taro.request<IResponse<R>>(requestConfig);

        // 处理HTTP状态码错误
        if (response.statusCode < 200 || response.statusCode >= 300) {
          await handleError(response.statusCode, response.data as IResponse);
          const error = new Error(`请求失败: HTTP ${response.statusCode}`);
          (error as { statusCode?: number }).statusCode = response.statusCode;
          throw error;
        }

        return parse<R>(response, { handleRaw: !!handleRaw });
      } catch (error: unknown) {
        lastError = error;
        attempts++;

        // 以下情况不应该重试：
        // 1. 取消请求
        // 2. 认证错误（401）
        // 3. 业务逻辑错误（code !== 0）
        // 4. 已达到最大重试次数
        const isBusinessError = (error as IBusinessError)?.isBusinessError;
        const isCanceled =
          (error as { errMsg?: string })?.errMsg?.includes("cancel") ||
          (error as { errMsg?: string })?.errMsg?.includes("abort");
        const statusCode =
          (error as { statusCode?: number; response?: { statusCode?: number } }).statusCode ||
          (error as { statusCode?: number; response?: { statusCode?: number } }).response?.statusCode;

        if (isCanceled || statusCode === 401 || isBusinessError || attempts > retry) {
          // 如果是网络错误且不是上述情况，在最后一次重试时显示错误
          if (attempts > retry && !isBusinessError && statusCode !== 401 && !isCanceled) {
            await Taro.showToast({
              title: "网络错误，请检查网络连接",
              icon: "none",
              duration: 2000,
            });
          }
          throw error;
        }

        // 等待后重试
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    throw lastError || new Error("请求失败，已达到最大重试次数");
  } finally {
    // 隐藏 loading
    if (showLoading) {
      loadingManager.hide();
    }
  }
};

// 导出请求方法
export const get = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>("GET", config);

export const post = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>("POST", config);

export const put = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>("PUT", config);

export const del = <T, R>(config: IRequestConfig<T>): Promise<R> => requestMethod<T, R>("DELETE", config);

/**
 * 文件上传公共逻辑
 */
const uploadFiles = async <T>(
  url: string,
  files: string[], // 小程序端使用文件路径数组
  options: {
    handleRaw?: boolean;
    timeout?: number;
    cancelToken?: AbortController;
  },
): Promise<T> => {
  // 验证文件数组
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("至少需要一个文件");
  }

  // 构建完整URL（优先使用环境变量中的基础地址）
  const fullUrl = url.startsWith("http") ? url : `${ENV_API_BASE_URL}${url}`;

  // 获取token
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Taro.uploadFile 只支持单文件上传，如果是多文件需要循环上传
  // 这里实现单文件上传，多文件上传可以通过多次调用实现
  const uploadPromises = files.map((filePath, index) => {
    return new Promise<Taro.uploadFile.SuccessCallbackResult>((resolve, reject) => {
      Taro.uploadFile({
        url: fullUrl,
        filePath,
        name: files.length === 1 ? "files" : `files[${index}]`,
        formData: {},
        header: headers,
        timeout: options.timeout || DEFAULT_TIMEOUT,
        success: resolve,
        fail: reject,
      });
    });
  });

  // 执行上传
  const results = await Promise.all(uploadPromises);

  // 取第一个结果（单文件）或最后一个结果（多文件）
  const result = results[results.length - 1];

  // 处理HTTP状态码错误
  if (result.statusCode < 200 || result.statusCode >= 300) {
    let responseData: IResponse | null = null;
    try {
      responseData = JSON.parse(result.data) as IResponse;
    } catch {
      // 解析失败，使用默认错误信息
    }
    await handleError(result.statusCode, responseData || { code: result.statusCode, data: null, message: "上传失败" });
    const error = new Error(`上传失败: HTTP ${result.statusCode}`);
    (error as { statusCode?: number }).statusCode = result.statusCode;
    throw error;
  }

  // 解析响应数据
  let responseData: IResponse<T>;
  try {
    responseData = JSON.parse(result.data) as IResponse<T>;
  } catch {
    throw new Error("上传响应数据格式错误");
  }

  // 使用 parse 方法处理响应
  const mockResponse: Taro.request.SuccessCallbackResult<IResponse<T>> = {
    statusCode: result.statusCode,
    data: responseData,
    header: result.header || {},
    cookies: result.cookies || [],
    errMsg: result.errMsg || "uploadFile:ok",
  };

  return parse<T>(mockResponse, { handleRaw: !!options.handleRaw });
};

/**
 * 文件上传方法
 */
export const uploadSingleFile = async <T>(config: IRequestConfig<string>): Promise<T> => {
  if (!config.data) {
    throw new Error("File path is required");
  }
  return await uploadFiles<T>(config.url, [config.data], {
    handleRaw: config.handleRaw,
    timeout: config.timeout,
    cancelToken: config.cancelToken,
  });
};

export const uploadFile = async <T>(config: IRequestConfig<string[]>): Promise<T> => {
  if (!Array.isArray(config.data)) {
    throw new Error("Data must be an array of file paths");
  }
  if (config.data.length === 0) {
    throw new Error("At least one file is required");
  }
  return await uploadFiles<T>(config.url, config.data, {
    handleRaw: config.handleRaw,
    timeout: config.timeout,
    cancelToken: config.cancelToken,
  });
};

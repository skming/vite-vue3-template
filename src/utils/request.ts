import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { closeToast, showLoadingToast, showToast } from 'vant'
import router from '@/router'

/**
 * 后端返回的标准响应结构
 */
interface AxiosResult<T = any> {
  code: number
  success: boolean
  message: string
  result: T
}

/**
 * 默认请求配置
 */
const BASE_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000,
  withCredentials: true,
}

/**
 * HTTP 状态码错误映射表
 */
const STATUS_ERROR_MAPPING: Record<number, string> = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求资源不存在(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网关超时(504)',
  505: 'HTTP版本不受支持(505)',
}

class Request {
  private instance: AxiosInstance
  private pendingMap: Map<string, AbortController> = new Map()

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ ...BASE_CONFIG, ...config })
    this.setupInterceptors()
  }

  /**
   * 生成请求唯一标识，优化处理 FormData
   */
  private getRequestKey(config: AxiosRequestConfig): string {
    const { method, url, params, data } = config
    // 特殊处理 FormData，它不适合直接序列化
    const serializeData = data instanceof FormData ? '[FormData]' : JSON.stringify(data)
    return [method, url, JSON.stringify(params), serializeData].join('&')
  }

  /**
   * 添加请求到 pendingMap 并注入 AbortSignal
   */
  private addPending(config: InternalAxiosRequestConfig) {
    const key = this.getRequestKey(config)
    const cancelDuplicate = config.repeatCancel ?? true

    if (cancelDuplicate && this.pendingMap.has(key)) {
      this.pendingMap.get(key)?.abort('Canceled redundant request')
      this.pendingMap.delete(key)
    }

    if (cancelDuplicate) {
      const controller = new AbortController()
      config.signal = config.signal || controller.signal
      this.pendingMap.set(key, controller)
    }
  }

  /**
   * 清理已完成的请求标识
   */
  private removePending(config: AxiosRequestConfig) {
    const key = this.getRequestKey(config)
    this.pendingMap.delete(key)
  }

  /**
   * 接口报错统一提示
   */
  private handleError(message: string, isNetworkError: boolean = false) {
    showToast({
      message: message || (isNetworkError ? '网络连接异常' : '未知错误'),
      type: 'fail',
      duration: 3000,
    })
  }

  /**
   * 取消所有进行中的请求
   */
  public cancelAll() {
    this.pendingMap.forEach(v => v.abort('Global cancel'))
    this.pendingMap.clear()
  }

  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 重复请求取消处理
        this.addPending(config)

        // 全局 Loading 显示逻辑
        if (config.loading) {
          showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
          })
        }

        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error),
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse<AxiosResult>): any => {
        const { config, data } = response

        this.removePending(config)
        if (config.loading)
          closeToast()

        // 返回非 json 格式的原始数据
        if (config.responseType && config.responseType !== 'json')
          return data

        // 业务逻辑错误拦截
        // 根据后端约定，如果 code 不是 200 或者 success 为 false，则视为业务异常
        if (data.code !== 200 && !data.success) {
          this.handleError(data.message)
          return Promise.reject(data)
        }

        return data
      },
      (error: AxiosError) => {
        const { config, response } = error

        if (config) {
          this.removePending(config)
          if (config.loading)
            closeToast()
        }

        // 处理手动取消的情况
        if (axios.isCancel(error)) {
          console.warn('[Request Canceled]:', error.message)
          return Promise.reject(error)
        }

        if (response) {
          const { status } = response
          const errorData = response.data as { message?: string }
          const message = errorData?.message || STATUS_ERROR_MAPPING[status] || `连接出错(${status})`

          this.handleError(message)

          if (status === 401)
            this.handleUnauthorized()
        }
        else {
          this.handleError('网络连接超时，请检查您的网络环境', true)
        }

        return Promise.reject(error)
      },
    )
  }

  private handleUnauthorized() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  /**
   * 通用请求方法封装
   */
  public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.get(url, { params, ...config })
  }

  public post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.delete(url, config)
  }

  public download(url: string, data?: object, config?: AxiosRequestConfig): Promise<Blob> {
    return this.instance.post(url, data, { ...config, responseType: 'blob' })
  }
}

export { Request }
export default new Request()

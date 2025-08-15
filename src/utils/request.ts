import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showToast } from 'vant'

interface AxiosResult<T = any> {
  code: number
  success: boolean
  message: string
  result: T
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = {
    // 默认请求地址，可在 .env.** 文件中修改
    baseURL: import.meta.env.VITE_BASE_URL,
    // 设置超时时间
    timeout: 60000,
    // 跨域时候允许携带凭证
    withCredentials: true,
  }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): any => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem('token')
        if (token) {
          // token
          config.headers?.set('Authorization', token)
        }
        return config
      },
      (error: AxiosError) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse): any => {
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res
      },
      (error: AxiosError) => {
        // 这里用来处理http常见错误，进行全局提示
        const status = error.response?.status
        let message = error.message
        const errorMessages: Record<number, string> = {
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

        message = errorMessages[status as number] || `连接出错(${status})!`

        showToast(message)

        if (status === 401) {
          // 清空storage并跳转到登录页
          localStorage.clear()
        }
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(error)
      },
    )
  }

  /**
   * @description 定义请求方法
   */
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.get(url, { params, ...config })
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.delete(url, config)
  }

  public download<T = BlobPart>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.post(url, data, { ...config, responseType: 'blob' })
  }
}

// 默认导出Request实例
export default new Request({})

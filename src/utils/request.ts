import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { showToast } from 'vant'

interface Result<T = any> {
  code: number
  success: boolean
  message: string
  result: T
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
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
        let message = ''
        const { response } = error
        switch (response?.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            // 这里可以做清空storage并跳转到登录页的操作
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求出错(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `连接出错(${response?.status})!`
        }
        showToast(message)
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
  ): Promise<Result<T>> {
    return this.instance.get(url, { params, ...config })
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<Result<T>> {
    return this.instance.delete(url, config)
  }

  public download(url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BlobPart> {
    return this.instance.post(url, data, { ...config, responseType: 'blob' })
  }
}

// 默认导出Request实例
export default new Request({})

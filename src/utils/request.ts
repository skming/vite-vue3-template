import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { showToast } from 'vant'
import { useRouter } from 'vue-router' // 假设使用 Vue Router，进行 401 跳转

interface AxiosResult<T = any> {
  code: number
  success: boolean
  message: string
  result?: T
}

// 导出 Request 类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = {
    // 默认请求地址，可在 .env.** 文件中修改
    baseURL: import.meta.env.VITE_BASE_URL,
    // 设置超时时间（60秒）
    timeout: 60000,
    // 跨域时候允许携带凭证
    withCredentials: true,
  }

  constructor(config: AxiosRequestConfig = {}) {
    // 使用 axios.create 创建 axios 实例，合并默认配置
    this.instance = axios.create({ ...this.baseConfig, ...config })

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // 请求拦截：添加 token
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = token
        }
        return config
      },
      (error: AxiosError) => {
        // 请求错误提示
        showToast({ message: '请求失败，请检查网络', type: 'fail' })
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse<AxiosResult>): any => {
        // 响应成功：返回 res.data，并检查自定义 code
        // 直接返回res，当然你也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res.data
      },
      (error: AxiosError) => {
        // 响应错误处理
        const response = error.response
        let message = error.message

        if (response) {
          const status = response.status
          // 从后端数据中提取错误信息
          const errorData = response.data as { message?: string }
          message = errorData?.message || this.getErrorMessage(status)

          showToast({ message, type: 'fail' })

          if (status === 401) {
            localStorage.clear()
            const router = useRouter()
            router.push('/login') // 跳转到登录页
          }
        }
        else {
          showToast({ message: '网络连接失败', type: 'fail' })
        }

        return Promise.reject(error)
      },
    )
  }

  // 获取 HTTP 状态码对应错误消息
  private getErrorMessage(status: number): string {
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
    return errorMessages[status] || `连接出错(${status})!`
  }

  /**
   * @description 定义请求方法，支持取消请求
   */
  public request<T = any>(config: AxiosRequestConfig): Promise<AxiosResult<T>> {
    return this.instance.request(config)
  }

  public get<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.get(url, { params, ...config })
  }

  public post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResult<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: object,
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

  public download(
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): Promise<Blob> {
    return this.instance.post(url, data, { ...config, responseType: 'blob' })
  }

  // 支持请求取消，返回 AbortController 的 signal
  public createCancelSignal(): AbortSignal {
    const controller = new AbortController()
    return controller.signal
  }
}

// 默认导出 Request 实例
export default new Request()

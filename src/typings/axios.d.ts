import * as axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
  interface AxiosResponse<T = any> {
    // 这里追加你的参数
    success: boolean
    code: number
    message: string
    result: T
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

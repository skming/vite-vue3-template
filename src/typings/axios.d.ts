declare module 'axios' {
  interface AxiosRequestConfig {
    repeatCancel?: boolean // 是否开启重复请求取消
    loading?: boolean // 是否显示加载提示
  }
  interface InternalAxiosRequestConfig {
    repeatCancel?: boolean
    loading?: boolean
  }
}

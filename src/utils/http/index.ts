import Axios, { AxiosRequestConfig } from 'axios'
import { Result } from '@/api/global'
import { ResultEnum } from '@/enums/httpEnum'
const message = (window as any).$message
const errorDefaultMsg: string = '服务异常,请稍后重试'

const http = Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000
})
// 请求拦截
http.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    return config
  },
  error => {
    return error
  }
)
// 响应拦截
http.interceptors.response.use(
  response => {
    const res = response.data as Result<any>
    // 请求错误
    if (res.code !== ResultEnum.SUCCESS) {
      message.error(res.msg || errorDefaultMsg)
      // 登录失效
      // if (res.code === ResultEnum.ERROR) {
      // }
      return Promise.reject(res.msg || errorDefaultMsg)
    }
    return res
  },
  error => {
    // token失效
    if (error?.response?.status === 401) {
      message.info('token失效，请重新登录', {
        type: 'error',
        duration: 1500,
        onClose: () => {}
      })
    }
    message.error('网络超时，稍后再试吧')
    return Promise.reject(error)
  }
)

const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return http.request<T, T>({
        url: config
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return http.request<T, T>({
        url: config,
        ...options
      })
    }
  } else {
    return http.request<T, T>(config)
  }
}
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export default http

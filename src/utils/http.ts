import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Recordable } from '#/global'
import { Result } from '@/api/global'
import { useUserStore } from '@/store/modules/user'

const message = (window as any).$message
const pendingRequest = new Map()

function generateReqKey(config: any) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function addPendingRequest(config: any) {
  const requestKey = generateReqKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel)
      }
    })
}

function removePendingRequest(config: any) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey)
    cancel(requestKey)
    pendingRequest.delete(requestKey)
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // api
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// Request interceptors
instance.interceptors.request.use(
  config => {
    // 请求头中添加token
    const userStore = useUserStore()
    const token = userStore.getToken
    if (token) {
      ;(config as Recordable).headers.token = token
    }
    removePendingRequest(config) // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求添加到pendingRequest对象中
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
instance.interceptors.response.use(
  response => {
    removePendingRequest(response.config) // 从pendingRequest对象中移除请求
    const res: any = response.data as Result
    if (res.code !== 200) {
      message.error(res.message)
      // token失效，退出登录
      // if (res.code === 401) {
      // }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
    if (axios.isCancel(error)) {
      console.log('已取消的重复请求：' + error.message)
    } else {
      // 添加异常处理
      message.error(error.message)
    }
    return Promise.reject(error)
  }
)

const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options
      })
    }
  } else {
    return instance.request<T, T>(config)
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
export default request

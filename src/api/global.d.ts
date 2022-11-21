// 接口返回 形状
export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message: string
  data: T
}

// 分页
export interface PageSize {
  page: number
  pageSize: number
}

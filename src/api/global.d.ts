// 接口返回 形状
export interface Result<T = any> {
  code: number
  type?: 'success' | 'error' | 'warning'
  message?: string
  msg?: string
  data: T
}

// 分页
export interface PageSize {
  pageNum: number
  limit: number
}
// 表格/列表参数
export type ParamsType<T> = T & PageSize

// 请求结果值
export type DataListType = Result<{
  list: any[]
  total: number
  [P: string]: any
}>

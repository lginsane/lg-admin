import { get, post } from '@/utils/http'
import { Result, PageSize } from './global'

export function useRegisterCommonAPI<R, T>(prefix: string) {
  type PageResult = Result<{
    list: T[]
    total: number
  }>
  type PageData<P> = P & PageSize
  // 分页
  const getPageList = async (params: PageData<T>) =>
    get<PageResult>({ url: `/${prefix}/page`, params })

  // 列表
  const getList = async (params: T) => get<Result<R[]>>({ url: `/${prefix}/list`, params })

  // 新增
  const create = async (params: R) => post<Result<boolean>>({ url: `/${prefix}/add`, params })

  // 编辑
  const update = async (data: R) => post<Result<boolean>>({ url: `/${prefix}/update`, data })

  // 启用
  const enable = async (id: string | number) =>
    post<Result<boolean>>({ url: `/${prefix}/enable`, data: { id } })

  // 禁用
  const disable = async (id: string | number) =>
    post<Result<boolean>>({ url: `/${prefix}/disable`, data: { id } })

  // 查询
  const read = async (id: string | number) =>
    get<Result<boolean>>({ url: `/${prefix}/get`, params: { id } })

  // 删除
  const remove = async (id: string | number) =>
    post<Result<boolean>>({ url: `/${prefix}/remove`, data: { id } })

  return {
    getPageList,
    getList,
    create,
    update,
    read,
    remove,
    enable,
    disable
  }
}

import { Recordable, Nullable } from '#/global'
import { Result } from '@/api/global'
export type APIProps = {
  request?: Nullable<(...arg: any[]) => Promise<any>>
  params?: Recordable
}

export type ResultTable = Result<{
  list: any[]
  total: number
}>

export interface StateProp {
  tableTotal: number
  tableData: Recordable[]
  loading: boolean
  page: number
  pageSize: number
}

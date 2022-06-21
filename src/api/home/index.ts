import { post } from '@/utils/http/index'
import { PageSize, DataListType } from '../global'
import type { ExpandObjectType } from '#/global'

export const getBlock = async (data: ExpandObjectType<PageSize>) =>
  post<DataListType>({ url: '/trace/browser/blockList', data })

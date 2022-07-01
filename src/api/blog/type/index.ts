import { useRegisterCommonAPI } from '@/api/common'
import { TypeItem, TypeParams } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<TypeItem, TypeParams>('account')

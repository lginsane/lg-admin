import { useRegisterCommonAPI } from '@/api/common'
import { UserItem, UserParams } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<UserItem, UserParams>('account')

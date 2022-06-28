import { useRegisterCommonAPI } from '@/api/common'
import { AccountItem, AccountParams } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<AccountItem, AccountParams>('account')

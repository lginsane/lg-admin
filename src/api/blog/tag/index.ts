import { useRegisterCommonAPI } from '@/api/common'
import { TagItem, TagParams } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<TagItem, TagParams>('blog/tag')

import { useRegisterCommonAPI } from '@/api/common'
import { ArticleItem, ArticleParams } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<ArticleItem, ArticleParams>('blog/article')

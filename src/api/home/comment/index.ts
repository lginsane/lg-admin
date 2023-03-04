import { useRegisterCommonAPI } from '@/api/common'
import { post } from '@/utils/http'
import { CommentItem, CommentParams, ReplyType, ReplyResult } from './model'

export const { getPageList, getList, create, update, read, remove, enable, disable } =
  useRegisterCommonAPI<CommentItem, CommentParams>('comment')

// 评论回复
export const reply = async (data: ReplyType) => post<ReplyResult>({ url: '/comment/reply', data })

import { Result } from '../../global'

export interface CommentItem {
  id?: number // id
  replyId?: number // 回复id
  status: 0 | 1 // 0 未读 1 已读
  articleId: number // 文章id
  articleText: string // 文章标题
  nickname: string // 用户昵称
  avatar: string // 用户头像
  address: string // 用户地址
  childComment?: CommentItem[] // 回复评论
  comment: string // 评论内容
  ip: string // 用户ip
  role?: string // 用户权限
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
  deleteTime?: string // 删除时间
}

export interface CommentParams {
  status: 0 | 1 // 状态 0 未读 1 已读
}

export interface ReplyType {
  id: number
  comment: string
}

export type ReplyResult = Result<boolean>

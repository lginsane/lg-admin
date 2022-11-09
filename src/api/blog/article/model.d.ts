import { Nullable } from '#/global'
export interface ArticleItem {
  id?: number // ID
  title: string // 标题
  desc: string // 描述
  sortNo: Nullable<string> // 顺序
  type: Nullable<number> // 分类
  typeName?: string // 分类名称
  tags: number[] // 标签
  tagsName?: string[] // 标签名称
  coverImg: string // 封面
  status: number // 状态 0: 草稿 1: 已发布
  content: string // 内容
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
}

export interface ArticleParams {
  keyword: string // 标题
  status: 0 | 1 // 状态 0: 草稿 1: 已发布
  tags: string // 标签
  type: number // 分类
}

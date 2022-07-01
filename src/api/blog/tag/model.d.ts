export interface TagItem {
  id?: number // ID
  name: string // 名称
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
}

export interface TagParams {
  keyword: string // 名称
}

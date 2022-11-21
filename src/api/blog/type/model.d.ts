export interface TypeItem {
  id?: number // ID
  name: string // 名称
  describe: string // 描述
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
}

export interface TypeParams {
  keyword: string // 名称
}

export interface AccountItem {
  id?: number // ID
  account: string // 账户
  nickname: string // 昵称
  password?: string // 密码
  sex: 0 | 1 // 性别 0: 女 1: 男
  status: 0 | 1 // 状态 0: 禁用 1: 启用
  permission: 0 | 1 // 权限 0: 管理员 1: 普通人员
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
}

export interface AccountParams {
  keyword: string // 账户、昵称
  status: 0 | 1 // 状态 0: 禁用 1: 启用
  permission: 0 | 1 // 权限 0: 管理员 1: 普通人员
}

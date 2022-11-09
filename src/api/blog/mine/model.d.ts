export interface LinkType {
  title: string // 名称
  url: string // 地址
  icon: string // 图标
}
export interface MineType {
  name: string // 名称
  avatar: string // 头像
  signature?: string // 签名
  links: LinkType[] // 链接
  content?: string // 内容
}

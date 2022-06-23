interface Link {
  title: string // 名称
  url: string // 地址
  icon: string // 图标
}
export interface MyInfoType {
  name: string // 名称
  avatar: string // 头像
  signature: string // 签名
  links: Link[] // 链接
  content: string // 内容
}

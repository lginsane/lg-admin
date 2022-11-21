export interface MenuConfig {
  inverted: boolean // 使用反转样式
  mode: 'vertical' | 'horizontal' // 布局方式
  collapsed?: boolean // 菜单是否折叠，值在菜单为垂直时有用
}

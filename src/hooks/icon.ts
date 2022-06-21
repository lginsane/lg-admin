import { NIcon } from 'naive-ui'
import { h, Component } from 'vue'

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

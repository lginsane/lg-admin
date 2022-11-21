import { PropType } from 'vue'
import type { ButtonProps } from 'naive-ui'

export interface actionItem extends ButtonProps {
  label: string // 按钮文字
  isShow?: boolean | (() => boolean) // 显示/隐藏
  isConfirm?: boolean // 二次确认
  onConfirm?: Function
}
export const actionProps = {
  actions: {
    type: Array as PropType<actionItem[]>,
    default: () => []
  }
}

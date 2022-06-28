import { NForm } from 'naive-ui'
import { PropType } from 'vue'
import { SchemaItem } from './types/index'

export const basicProps = {
  formProps: {
    ...NForm.props
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80
  },
  schemas: {
    type: Array as PropType<SchemaItem[]>,
    default: () => {}
  },
  // 显示确认按钮
  showSubmitButton: {
    type: Boolean,
    default: true
  },
  // 显示重置按钮
  showResetButton: {
    type: Boolean,
    default: true
  },
  // 显示展开收起按钮
  showAdvancedButton: {
    type: Boolean,
    default: true
  },
  // 重置后立即执行确认
  submitOnReset: {
    type: Boolean,
    default: false
  }
}

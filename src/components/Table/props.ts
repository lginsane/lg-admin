import { NDataTable } from 'naive-ui'
import { PropType } from 'vue'
import { APIProps } from './types'
export const basicProps = {
  ...NDataTable.props,
  apiProps: Object as PropType<APIProps>,
  hasExecute: {
    type: Boolean,
    default: true
  }
}

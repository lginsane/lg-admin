import { NDataTable, DataTableColumn } from 'naive-ui'
import { PropType } from 'vue'
import { APIProps } from './types'
export const basicProps = {
  ...NDataTable.props,
  apiProps: Object as PropType<APIProps>,
  actionColumn: {
    type: Object as PropType<DataTableColumn>,
    default: () => {}
  },
  hasExecute: {
    type: Boolean,
    default: true
  }
}

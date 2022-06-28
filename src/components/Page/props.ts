import { PropType } from 'vue'
import { CardOptionItem } from './types/index'
export const basicProps = {
  hideBreadcrumb: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  cardOption: {
    type: Array as PropType<CardOptionItem[]>,
    default: () => {
      return []
    }
  }
}

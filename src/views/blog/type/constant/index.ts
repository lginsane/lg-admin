import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn } from 'naive-ui'

// page cardOption
export const pageCardOption: CardOptionItem[] = [
  {
    title: '分类管理',
    slotName: 'type',
    isCard: true,
    bordered: false
  }
]
// table columns
export const tableColumns: DataTableColumn[] = [
  {
    title: '分类名称',
    key: 'name'
  },
  {
    title: '分类描述',
    key: 'describe'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '更新时间',
    key: 'updateTime'
  }
]

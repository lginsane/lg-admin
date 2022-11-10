import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn } from 'naive-ui'

// page cardOption
export const pageCardOption: CardOptionItem[] = [
  {
    title: '标签管理',
    slotName: 'tag',
    isCard: true,
    bordered: false
  }
]
// table columns
export const tableColumns: DataTableColumn[] = [
  {
    title: '标签名称',
    key: 'name'
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

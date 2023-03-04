import { SchemaItem } from '@/components/SearchTable/types/index'
import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn, NTag } from 'naive-ui'
import { valueConversionLabel } from '@/utils/index'

// 状态
export const statusOptions = [
  {
    label: '已读',
    value: 1,
    type: 'success'
  },
  {
    label: '未读',
    value: 0,
    type: 'error'
  }
]
// page cardOption
export const pageCardOption: CardOptionItem[] = [
  {
    title: '评论管理',
    slotName: 'comment',
    isCard: true,
    bordered: false
  }
]
// search schemas
export const SearchSchemas: SchemaItem[] = [
  {
    label: '用户昵称',
    path: 'nickname',
    component: 'NInput',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入用户昵称'
    }
  },
  {
    label: '文章标题',
    path: 'articleText',
    component: 'NInput',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入文章标题'
    }
  },
  {
    label: '评论状态',
    path: 'status',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选评论状态',
      options: statusOptions
    }
  }
]
// table columns
export const tableColumns: DataTableColumn[] = [
  {
    title: '用户昵称',
    key: 'nickname'
  },
  {
    title: '文章标题',
    key: 'articleText'
  },
  {
    title: '评论内容',
    key: 'comment'
  },
  {
    title: '状态',
    key: 'status',
    render: row => {
      return h(
        NTag as any,
        { type: valueConversionLabel(row.status, statusOptions, { label: 'type' }) },
        () => h('span', valueConversionLabel(row.status, statusOptions))
      )
    }
  },
  {
    title: '评论时间',
    key: 'createTime'
  }
]

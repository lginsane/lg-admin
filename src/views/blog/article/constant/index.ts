import { SchemaItem } from '@/components/SearchTable/types/index'
import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn, NTag } from 'naive-ui'
import { valueConversionLabel } from '@/utils/index'
import { initData } from '../hooks/index'

const { typeOptions, tagOptions } = initData()
// 状态
export const statusOptions = [
  {
    label: '已发布',
    value: 1,
    type: 'success'
  },
  {
    label: '草稿',
    value: 0,
    type: 'error'
  }
]
// page cardOption
export const pageCardOption: CardOptionItem[] = [
  {
    title: '文章管理',
    slotName: 'article',
    isCard: true,
    bordered: false
  }
]
// search schemas
export const SearchSchemas: SchemaItem[] = [
  {
    label: '文章分类',
    path: 'type',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选择文章分类',
      options: unref(typeOptions)
    }
  },
  {
    label: '文章标签',
    path: 'tag',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选择文章标签',
      options: unref(tagOptions),
      multiple: true
    }
  },
  {
    label: '文章状态',
    path: 'status',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选择文章状态',
      options: statusOptions
    }
  },
  {
    label: '文章标题',
    path: 'title',
    component: 'NInput',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入文章标题'
    }
  }
]
// table columns
export const tableColumns: DataTableColumn[] = [
  {
    title: '文章标题',
    key: 'title'
  },
  {
    title: '排序',
    key: 'sortNo'
  },
  {
    title: '文章分类',
    key: 'typeName'
  },
  {
    title: '文章标签',
    key: 'tagsName'
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
    title: '创建时间',
    key: 'createTime'
  },
  {
    title: '更新时间',
    key: 'updateTime'
  }
]

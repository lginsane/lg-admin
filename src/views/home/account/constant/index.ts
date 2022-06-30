import { SchemaItem } from '@/components/SearchTable/types/index'
import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn, NTag } from 'naive-ui'
import { valueConversionLabel } from '@/utils/index'

// 状态
export const statusOptions = [
  {
    label: '启用',
    value: 1,
    type: 'success'
  },
  {
    label: '禁用',
    value: 0,
    type: 'error'
  }
]
// 性别
export const sexOptions = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 0
  }
]
// 权限
export const permissionOptions = [
  {
    label: '普通人员',
    value: 1
  },
  {
    label: '管理员',
    value: 0
  }
]
// page cardOption
export const pageCardOption: CardOptionItem[] = [
  {
    title: '账户管理',
    slotName: 'account',
    isCard: true,
    bordered: false
  }
]
// search schemas
export const SearchSchemas: SchemaItem[] = [
  {
    label: '用户名称',
    path: 'name',
    component: 'NInput',
    defaultValue: '',
    componentProps: {
      placeholder: '请输入用户名称、昵称'
    }
  },
  {
    label: '用户状态',
    path: 'status',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选用户状态',
      options: statusOptions
    }
  },
  {
    label: '用户权限',
    path: 'permission',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选用户权限',
      options: permissionOptions
    }
  }
]
// table columns
export const tableColumns: DataTableColumn[] = [
  {
    title: '账户',
    key: 'account'
  },
  {
    title: '昵称',
    key: 'nickname'
  },
  {
    title: '性别',
    key: 'sex',
    render: row => {
      return valueConversionLabel(row.sex, sexOptions)
    }
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
    title: '权限',
    key: 'permission',
    render: row => {
      return h(NTag as any, () =>
        h('span', valueConversionLabel(row.permission, permissionOptions))
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

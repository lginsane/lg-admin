import { SchemaItem } from '@/components/SearchTable/types/index'
import { CardOptionItem } from '@/components/Page/types/index'
import { DataTableColumn } from 'naive-ui'

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
      options: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  },
  {
    label: '用户权限',
    path: 'permission',
    component: 'NSelect',
    componentProps: {
      placeholder: '请选用户权限',
      options: [
        {
          label: '普通人员',
          value: 1
        },
        {
          label: '管理员',
          value: 0
        }
      ]
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
      const sexOptions = {
        0: '女',
        1: '男'
      }
      return sexOptions[row.sex as number]
    }
  },
  {
    title: '状态',
    key: 'status',
    render: row => {
      const statusOptions = {
        0: '禁用',
        1: '启用'
      }
      return statusOptions[row.status as number]
    }
  },
  {
    title: '权限',
    key: 'permission'
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

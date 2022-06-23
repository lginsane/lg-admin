import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { FileTrayFullOutline, FileTraySharp, FileTrayStacked } from '@vicons/ionicons5'
export const ProjectRouters = [
  {
    path: '/project',
    name: 'Project',
    component: Layout,
    redirect: '/project/personal',
    meta: {
      title: '项目',
      icon: renderIcon(FileTrayFullOutline)
    },
    children: [
      {
        path: '/project/personal',
        name: 'ProjectPersonal',
        component: () => import('@/views/project/personal/index.vue'),
        meta: {
          title: '个人项目',
          icon: renderIcon(FileTraySharp)
        }
      },
      {
        path: '/project/company',
        name: 'ProjectCompany',
        component: () => import('@/views/project/company/index.vue'),
        meta: {
          title: '公司项目',
          icon: renderIcon(FileTrayStacked)
        }
      }
    ]
  }
]

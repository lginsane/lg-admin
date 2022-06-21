import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { FileTrayFullOutline } from '@vicons/ionicons5'
export const ProjectRouters = [
  {
    path: '/project',
    name: 'Project',
    component: Layout,
    redirect: '/project/index',
    meta: {
      title: '项目',
      icon: renderIcon(FileTrayFullOutline)
    },
    children: [
      {
        path: '/project/index',
        name: 'ProjectIndex',
        component: () => import('@/views/project/index.vue'),
        meta: {
          title: '项目'
        }
      }
    ]
  }
]

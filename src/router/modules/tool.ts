import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { ConstructOutline } from '@vicons/ionicons5'
export const ToolRouters = [
  {
    path: '/tool',
    name: 'Tool',
    component: Layout,
    redirect: '/tool/index',
    meta: {
      title: '工具',
      icon: renderIcon(ConstructOutline)
    },
    children: [
      {
        path: '/tool/index',
        name: 'ToolIndex',
        component: () => import('@/views/tool/index.vue'),
        meta: {
          title: '工具1'
        }
      }
    ]
  }
]

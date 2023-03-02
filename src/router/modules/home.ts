import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { HomeOutline, BarChart, Person } from '@vicons/ionicons5'
export const HomeRouters = [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/statistics',
    meta: {
      title: '主页',
      icon: renderIcon(HomeOutline)
    },
    children: [
      {
        path: '/home/statistics',
        name: 'Statistics',
        component: () => import('@/views/home/statistics/index.vue'),
        meta: {
          title: '统计',
          icon: renderIcon(BarChart)
        }
      },
      {
        path: '/home/account',
        name: 'Account',
        component: () => import('@/views/home/account/index.vue'),
        meta: {
          title: '用户',
          icon: renderIcon(Person)
        }
      }
    ]
  }
]

import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { BookOutline, Pricetags, DocumentTextSharp, Grid, People } from '@vicons/ionicons5'
export const BlogRouters = [
  {
    path: '/blog',
    name: 'Blog',
    component: Layout,
    redirect: '/blog/user',
    meta: {
      title: '博客',
      icon: renderIcon(BookOutline)
    },
    children: [
      {
        path: '/blog/user',
        name: 'User',
        component: () => import('@/views/blog/user/index.vue'),
        meta: {
          title: '用户',
          icon: renderIcon(People)
        }
      },
      {
        path: '/blog/article',
        name: 'Article',
        component: () => import('@/views/blog/article/index.vue'),
        meta: {
          title: '文章',
          icon: renderIcon(DocumentTextSharp)
        }
      },
      {
        path: '/blog/tag',
        name: 'Tag',
        component: () => import('@/views/blog/tag/index.vue'),
        meta: {
          title: '标签',
          icon: renderIcon(Pricetags)
        }
      },
      {
        path: '/blog/type',
        name: 'Type',
        component: () => import('@/views/blog/type/index.vue'),
        meta: {
          title: '分类',
          icon: renderIcon(Grid)
        }
      }
    ]
  }
]

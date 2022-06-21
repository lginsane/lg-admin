import { Layout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import { BookOutline, Pricetags, DocumentTextSharp } from '@vicons/ionicons5'
export const BlogRouters = [
  {
    path: '/blog',
    name: 'Blog',
    component: Layout,
    redirect: '/blog/article',
    meta: {
      title: '博客',
      icon: renderIcon(BookOutline)
    },
    children: [
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
        path: '/blog/tags',
        name: 'Tags',
        component: () => import('@/views/blog/tags/index.vue'),
        meta: {
          title: '标签',
          icon: renderIcon(Pricetags)
        }
      }
    ]
  }
]

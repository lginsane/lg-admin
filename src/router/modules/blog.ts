import { Layout, BlankLayout } from '@/layout'
import { renderIcon } from '@/hooks/icon'
import {
  BookOutline,
  Pricetags,
  DocumentTextSharp,
  Grid,
  People,
  AccessibilitySharp
} from '@vicons/ionicons5'
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
      // {
      //   path: '/blog/mine',
      //   name: 'Mine',
      //   component: () => import('@/views/blog/mine/index.vue'),
      //   meta: {
      //     title: '个人资料',
      //     icon: renderIcon(AccessibilitySharp)
      //   }
      // },
      // {
      //   path: '/blog/user',
      //   name: 'User',
      //   component: () => import('@/views/blog/user/index.vue'),
      //   meta: {
      //     title: '用户',
      //     icon: renderIcon(People)
      //   }
      // },
      {
        path: '/blog/article',
        name: 'Article',
        component: BlankLayout,
        redirect: '/blog/article/list',
        meta: {
          title: '文章',
          icon: renderIcon(DocumentTextSharp)
        },
        children: [
          {
            path: '/blog/article/list',
            name: 'ArticleList',
            component: () => import('@/views/blog/article/index.vue'),
            meta: {
              title: '文章',
              icon: renderIcon(DocumentTextSharp),
              breadcrumb: false
            }
          },
          {
            path: '/blog/article/add',
            name: 'ArticleAdd',
            component: () => import('@/views/blog/article/views/article-add.vue'),
            meta: {
              title: '添加',
              hidden: true,
              activeMenu: 'ArticleList'
            }
          },
          {
            path: '/blog/article/update/:id',
            name: 'ArticleUpdate',
            component: () => import('@/views/blog/article/views/article-update.vue'),
            meta: {
              title: '编辑',
              hidden: true,
              activeMenu: 'ArticleList'
            }
          }
        ]
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

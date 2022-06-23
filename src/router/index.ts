import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { dynamicRouters } from './modules/index'
import { createRouterGuards } from './router-guard'
import { BlankLayout } from '@/layout'
import { PageEnum } from '@/enums/pageEnum'

// 不同模块 ./modules/ 引入
export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root'
    }
  },
  ...dynamicRouters,
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: BlankLayout,
    meta: {
      title: 'ErrorPage'
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'ErrorPageSon',
        component: () => import('@/views/exception/404.vue'),
        meta: {
          title: 'ErrorPage'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App<Element>) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router

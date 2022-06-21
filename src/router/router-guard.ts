// 路由守卫
import { Router } from 'vue-router'
// import { useAsyncRouteStore } from '@/store/asyncRoute'
export function createRouterGuards(router: Router) {
  // const asyncRouteStore = useAsyncRouteStore()
  router.beforeEach(async (to, from, next) => {
    const Loading = (window as any).$loading || null
    Loading && Loading.start()
    next()
    // 动态路由加载
    // if (asyncRouteStore.getIsDynamicAddedRoute) {
    //     next()
    //     return
    // }
    // asyncRouteStore.setIsDynamicAddedRoute(true)
    // const redirectPath = (from.query.redirect || to.path) as string
    // const redirect = decodeURIComponent(redirectPath)
    // const nextData =
    //     to.path === redirect ? { ...to, replace: true } : { path: redirect }
    // Loading && Loading.finish();
    // next(nextData)
  })

  router.afterEach(() => {
    const Loading = (window as any).$loading || null
    Loading && Loading.finish()
  })
}

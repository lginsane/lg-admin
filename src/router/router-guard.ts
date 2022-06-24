// 路由守卫
import { Router } from 'vue-router'
import { storage } from '@/utils/Storage'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { useWhiteName } from '@/hooks/index'
import { PageEnum } from '@/enums/pageEnum'
import { Recordable } from '#/global'
import { useUserStoreWidthOut } from '@/store/modules/user'

const LOGIN_PATH = PageEnum.BASE_LOGIN
export function createRouterGuards(router: Router) {
  const userStore = useUserStoreWidthOut()
  router.beforeEach(async (to, _, next) => {
    const Loading = (window as any).$loading || null
    Loading && Loading.start()
    const { isWhiteName } = useWhiteName(to.name as string)
    // 白名单
    if (isWhiteName) {
      next()
      return
    }
    const token = storage.getCookie(ACCESS_TOKEN)
    if (!token) {
      // 重定向登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }
    const info = storage.get(CURRENT_USER)

    if (!info) {
      await userStore.GetUserInfo()
      next()
    }
    // 已登录重定向首页
    if (to.path === LOGIN_PATH) {
      next(PageEnum.BASE_HOME)
      return
    }
    next()
  })

  router.afterEach(() => {
    const Loading = (window as any).$loading || null
    Loading && Loading.finish()
  })
}

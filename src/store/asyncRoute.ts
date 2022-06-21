import { defineStore } from 'pinia'

interface AsyncRouteState {
  isDynamicAddedRoute: boolean // 初始化路由
}
export const useAsyncRouteStore = defineStore({
  id: 'asyncRoute',
  state: (): AsyncRouteState => ({
    isDynamicAddedRoute: false
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setIsDynamicAddedRoute(val: boolean) {
      this.isDynamicAddedRoute = val
    }
  }
})

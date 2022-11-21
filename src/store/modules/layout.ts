import { defineStore } from 'pinia'

interface LayoutState {
  hasMobile: boolean // 是否为移动端
}
export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutState => ({
    hasMobile: false
  }),
  getters: {
    getHasMobile(): boolean {
      return this.hasMobile
    }
  },
  actions: {
    setHasMobile(val: boolean) {
      this.hasMobile = val
    }
  }
})

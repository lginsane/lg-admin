import { useLayoutStore } from '@/store/layout'
import { PageEnum } from '@/enums/pageEnum'
import { ref, Ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useSwitchMobile() {
  const layoutStore = useLayoutStore()
  const hasMobile: Ref<boolean> = ref(layoutStore.hasMobile)
  onResize()
  useEventListener('resize', onResize)
  function onResize() {
    const w = document.documentElement
      ? document.documentElement.clientWidth
      : document.body.clientWidth
    const r = 750
    if (w < r) {
      hasMobile.value = true
      layoutStore.setHasMobile(true)
    } else {
      hasMobile.value = false
      layoutStore.setHasMobile(false)
    }
  }

  return {
    hasMobile
  }
}
export function generatorOneLevelMenu(routerMap: Array<any>) {
  return routerMap.map(item => {
    const currentMenu = {
      label: item.meta?.title,
      key: item.name,
      icon: item.meta?.icon
    }
    return currentMenu
  })
}
/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
  console.log(routerMap)
  return routerMap.map(item => {
    const isRoot = isRootRouter(item)
    const info = isRoot ? item.children[0] : item
    const currentMenu = {
      ...info,
      ...info.meta,
      label: info.meta?.title,
      key: info.name,
      icon: isRoot ? item.meta?.icon : info.meta?.icon
    }
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      currentMenu.children = generatorMenu(info.children)
    }
    return currentMenu
  })
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>, name?: string) {
  return routerMap.filter(item => {
    if (item.children) {
      item.children = filterRouter(item.children)
    }
    const hasName = name ? item.name === name : item.name
    return (
      (item.meta?.hidden || false) !== true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path) &&
      hasName
    )
  })
}
/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
  return item.meta?.alwaysShow !== true && item.children?.length === 1
}

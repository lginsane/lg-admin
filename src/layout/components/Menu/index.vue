<script lang="ts" setup>
  import { MenuConfig } from '@/layout/types/index'
  import { generatorMenu, filterRouter } from '@/layout/hooks/index'
  import { constantRouter } from '@/router/index'
  // 当前路由
  const currentRoute = useRoute()
  const router = useRouter()
  // 选中的菜单
  const selectedKeys = ref<string>(currentRoute.name as string)
  const activeMenu = computed(() => {
    if (currentRoute.meta?.activeName) {
      return currentRoute.meta.activeName as string
    }
    return unref(selectedKeys)
  })
  // 路由列表
  const menuList = ref<any[]>([])
  function updateMenu() {
    menuList.value = generatorMenu(
      filterRouter(constantRouter, currentRoute.matched[0].name as string)[0].children
    )
    const nActiveMenu: string = (currentRoute.meta?.activeMenu as string) || ''
    selectedKeys.value = nActiveMenu ? (nActiveMenu as string) : (currentRoute.name as string)
  }
  // 默认配置
  const defaultMenuConfig: MenuConfig = reactive({
    inverted: false,
    mode: 'vertical',
    collapsed: false
  })
  // 获取当前打开的子菜单
  const matched = currentRoute.matched
  const getOpenKeys: any[] = matched && matched.length ? matched.map(item => item.name) : []
  const state = reactive({
    openKeys: getOpenKeys
  })
  watch(
    () => currentRoute.fullPath,
    () => {
      updateMenu()
    }
  )
  onMounted(() => {
    updateMenu()
  })

  // 点击菜单
  function clickMenuItem(key: string) {
    if (/http(s)?:/.test(key)) {
      window.open(key)
    } else {
      router.push({ name: key })
    }
  }

  // 展开菜单
  function menuExpanded(openKeys: string[]) {
    if (!openKeys) return
    const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)
    const isExistChildren = findChildrenLen(latestOpenKey as string)
    state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys
  }

  // 查找是否存在子路由
  function findChildrenLen(key: string) {
    if (!key) return false
    const subRouteChildren: string[] = []
    for (const { children, key } of unref(menuList)) {
      if (children && children.length) {
        subRouteChildren.push(key as string)
      }
    }
    return subRouteChildren.includes(key)
  }

  const menuWidth = computed(() => {
    return defaultMenuConfig.collapsed ? 64 : 200
  })
</script>

<template>
  <n-layout-sider
    :width="menuWidth"
    :collapsed="defaultMenuConfig.collapsed"
    :collapsed-width="64"
    class="global-menu"
    placement="left"
    bordered
    show-trigger
    @collapse="defaultMenuConfig.collapsed = true"
    @expand="defaultMenuConfig.collapsed = false"
  >
    <n-menu
      :value="activeMenu"
      :expanded-keys="state.openKeys"
      :mode="defaultMenuConfig.mode"
      :inverted="defaultMenuConfig.inverted"
      :collapsed="defaultMenuConfig.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :indent="24"
      :options="menuList"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    />
  </n-layout-sider>
</template>

<style lang="scss">
  .global-menu {
    .n-menu {
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>

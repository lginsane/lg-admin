<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()
  const dropdownSelect = key => {
    router.push({ name: key })
  }
  const generator: any = routerMap => {
    return routerMap.map(item => {
      const currentMenu = {
        ...item,
        label: item.meta.title,
        key: item.name,
        disabled: item.path === '/'
      }
      // 是否有子菜单，并递归处理
      if (item.children && item.children.length > 0) {
        // Recursion
        currentMenu.children = generator(item.children, currentMenu)
      }
      return currentMenu
    })
  }
  const breadcrumbList = computed(() => {
    return generator(route.matched)
  })
</script>

<template>
  <n-breadcrumb>
    <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
      <n-breadcrumb-item v-if="routeItem.meta.title">
        <span class="link-text" @click="dropdownSelect(routeItem.name)">
          <component :is="routeItem.meta.icon" v-if="routeItem.meta.icon" />
          {{ routeItem.meta.title }}
        </span>
      </n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<style lang="scss">
  .n-breadcrumb .n-breadcrumb-item {
    font-size: 16px;
  }
</style>

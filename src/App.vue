<script setup lang="ts">
  import { lighten } from '@/utils/index'
  import { zhCN } from 'naive-ui'
  const appTheme = '#2D6FFF'
  const getThemeOverrides = computed(() => {
    const lightenStr = lighten(appTheme, 6)
    return {
      common: {
        primaryColor: appTheme,
        primaryColorHover: lightenStr,
        primaryColorPressed: lightenStr
      },
      LoadingBar: {
        colorLoading: appTheme
      }
    }
  })
</script>

<template>
  <n-config-provider :locale="zhCN" :theme-overrides="getThemeOverrides">
    <Application>
      <router-view></router-view>
    </Application>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import HeaderLogo from './header-logo.vue'
  import HeaderMenu from './header-menu.vue'
  import HeaderUser from './header-user.vue'
</script>

<template>
  <n-layout-header class="global-header">
    <HeaderLogo></HeaderLogo>
    <HeaderMenu></HeaderMenu>
    <HeaderUser></HeaderUser>
  </n-layout-header>
</template>

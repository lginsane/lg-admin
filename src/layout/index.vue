<script lang="ts" setup>
  import GlobalHeader from './components/Header/index.vue'
  import GlobalMain from './components/Main/index.vue'
  import GlobalMenu from './components/Menu/index.vue'
</script>

<template>
  <n-layout class="global-layout">
    <global-header></global-header>
    <n-layout class="main-layout" has-sider>
      <global-menu></global-menu>
      <global-main></global-main>
    </n-layout>
    <n-back-top :right="60" />
  </n-layout>
</template>

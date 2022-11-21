<script lang="ts" setup>
  const keepAliveComponents = []
</script>

<template>
  <n-layout-content class="global-content">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </n-layout-content>
</template>

<style lang="scss"></style>

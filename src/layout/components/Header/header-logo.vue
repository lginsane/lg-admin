<script lang="ts" setup>
  import logo from '@/assets/logo.png'
  const logoUrl = logo
</script>

<template>
  <div class="global-logo">
    <img :src="logoUrl" alt="" />
  </div>
</template>

<style lang="scss">
  .global-logo {
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>

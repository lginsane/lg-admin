<template>
  <div class="page-container">
    <div class="text-center">
      <img src="~@/assets/404.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，你访问的页面不存在</h1>
      <n-button type="info" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const router = useRouter()
  function goHome() {
    router.push('/')
  }
</script>

<style lang="less" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 50px 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .text-center {
      text-align: center;
      h1 {
        color: #666;
        padding: 20px 0;
      }
      .text-base {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }

    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>

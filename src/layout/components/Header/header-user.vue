<script lang="ts" setup>
  import { PersonCircleSharp } from '@vicons/ionicons5'
  const username = 'admin'
  const avatarOptions = [
    {
      label: '个人设置',
      key: 1
    },
    {
      label: '退出登录',
      key: 2
    }
  ]
  function avatarSelect(key) {
    switch (key) {
      case 1:
        console.log(key)
        break
      case 2:
        console.log(key)
        break
    }
  }
</script>

<template>
  <div class="header-user">
    <n-dropdown trigger="hover" :options="avatarOptions" @select="avatarSelect">
      <div class="header-avatar">
        <n-icon size="34">
          <PersonCircleSharp />
        </n-icon>
        {{ username }}
      </div>
    </n-dropdown>
  </div>
</template>

<style lang="scss">
  .header-user {
    padding-right: 20px;
    .header-avatar {
      display: flex;
      align-items: center;
      font-size: 16px;
    }
  }
</style>

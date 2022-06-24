<script lang="ts" setup>
  import { PersonCircleSharp } from '@vicons/ionicons5'
  import { useDialog, useMessage } from 'naive-ui'
  import { useUserStoreWidthOut } from '@/store/modules/user'

  const dialog = useDialog()
  const message = useMessage()
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStoreWidthOut()
  const username = userStore.info.username
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
        doLogout()
        break
    }
  }
  // 退出登录
  const doLogout = () => {
    dialog.info({
      title: '提示',
      content: '您确定要退出登录吗',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        userStore.logout().then(() => {
          message.success('成功退出登录')
          router
            .replace({
              name: 'Login',
              query: {
                redirect: route.fullPath
              }
            })
            .finally(() => location.reload())
        })
      },
      onNegativeClick: () => {}
    })
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

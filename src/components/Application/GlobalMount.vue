<script lang="ts" setup>
  import { useLoadingBar, useMessage, useDialog, useNotification } from 'naive-ui'

  // 挂载在 window 方便与在 hooks 中使用
  ;(window as any).$loading = useLoadingBar()
  ;(window as any).$dialog = useDialog()
  ;(window as any).$message = useMessage()
  ;(window as any).$notification = useNotification()
</script>

<template><div></div></template>

<script lang="ts" setup>
  import { isFunction } from '@/utils/is'
  import { actionProps, actionItem } from '../types/actions'
  const props = defineProps({ ...actionProps })
  const getActions = computed(() => {
    return unref(props)
      .actions.map(action => {
        if (isFunction(action.isShow)) {
          action.isShow = action.isShow()
        }
        return {
          ...action,
          isShow: action.isShow ?? true
        }
      })
      .filter(action => action.isShow)
  })
  function handlePositiveClick(action: actionItem) {
    console.log('已确定')
    if (action.onConfirm) {
      action.onConfirm()
    }
  }
  function handleNegativeClick(action: actionItem) {
    ;(window as any).$message.info(`取消${action.label}`)
  }
</script>

<template>
  <div class="tableAction">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <n-button v-if="!action.isConfirm" v-bind="action">{{ action.label }}</n-button>
      <n-popconfirm
        v-else
        :show-icon="false"
        @positive-click="handlePositiveClick(action)"
        @negative-click="handleNegativeClick(action)"
      >
        <template #trigger>
          <n-button v-bind="action">{{ action.label }}</n-button>
        </template>
        确认{{ action.label }}吗？
      </n-popconfirm>
    </template>
  </div>
</template>

<style lang="scss">
  .tableAction {
    display: flex;
    justify-content: center;
    align-items: center;
    .n-button + .n-button {
      margin-left: 10px;
    }
  }
</style>

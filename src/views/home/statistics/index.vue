<script lang="ts" setup>
  const startTime = ref(new Date('2022-07-20 16:03').getTime())
  const endTime = ref(new Date().getTime())
  const state = reactive({
    dDay: Math.floor((endTime.value - startTime.value) / 1000 / 3600 / 24),
    dHour: Math.floor((endTime.value - startTime.value) / 1000 / 3600) % 24,
    dMinute: Math.floor((endTime.value - startTime.value) / 1000 / 60) % 60
  })
  setTimeout(() => {
    endTime.value = new Date().getTime()
    state.dDay = Math.floor((endTime.value - startTime.value) / 1000 / 3600 / 24)
    state.dHour = Math.floor((endTime.value - startTime.value) / 1000 / 3600 / 24)
    state.dMinute = Math.floor((endTime.value - startTime.value) / 1000 / 60) % 60
  }, 1000)
</script>
<template>
  <page>
    <div>已相识时间：{{ state.dDay }}天 {{ state.dHour }}小时 {{ state.dMinute }}分钟</div>
  </page>
</template>

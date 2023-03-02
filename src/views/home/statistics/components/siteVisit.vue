<template>
  <div id="visit" class="visit" />
</template>

<script lang="ts" setup>
  import { EChartsOption, init } from 'echarts'
  // import { querySiteVisit } from '@/api/blog/statistics'
  import { watch, reactive, defineProps, onMounted, nextTick } from 'vue'

  const props = defineProps({
    date: {
      type: Number,
      default: () => 7
    }
  })

  const data = reactive<any>({
    visitChart: null
  })

  const option: EChartsOption = {
    title: {
      text: '网站访问量统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['pv', 'uv', 'ip']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'pv',
        type: 'line',
        data: [15, 23, 12, 31, 9]
      },
      {
        name: 'uv',
        type: 'line',
        data: [3, 7, 4, 8, 2]
      },
      {
        name: 'ip',
        type: 'line',
        data: [3, 7, 4, 8, 2]
      }
    ]
  }
  async function queryVisitInfo() {
    // const res = await querySiteVisit({ date: props.date })
    // const data = res.result
    ;(option.xAxis as any).data = [
      '2023-03-01',
      '2023-03-02',
      '2023-03-03',
      '2023-03-04',
      '2023-03-05'
    ]
    // ;(option.series as any).forEach(item => {
    //   item.data = [12, 25, 14, 37, 14]
    // })
    console.log(document.getElementById('visit'), '123')
    data.visitChart = init(document.getElementById('visit') as HTMLElement)
    data.visitChart.setOption(option)
    window.onresize = function () {
      data.visitChart.resize()
    }
  }
  onMounted(() => {
    nextTick(() => {
      queryVisitInfo()
    })
  }),
    watch(
      () => props.date,
      () => {
        queryVisitInfo()
      }
    )
</script>

<style lang="scss" scoped>
  .visit {
    width: 100%;
    height: 100%;
  }
</style>

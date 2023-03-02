<template>
  <div id="typeInfo" class="typeInfo" />
</template>

<script lang="ts" setup>
  import { onMounted, nextTick } from 'vue'
  import { EChartsOption, init } from 'echarts'
  // import { queryStatisticsTypeInfo } from '@/api/blog/statistics'

  const option: EChartsOption = {
    title: {
      text: '文章分类数量统计',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '数量统计',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  async function queryTypeInfo() {
    // const res = await queryStatisticsTypeInfo()
    ;(option.series as any)[0].data = [
      {
        id: 3,
        name: '总结',
        value: 2
      },
      {
        id: 4,
        name: '入门知识',
        value: 2
      },
      {
        id: 5,
        name: '工具',
        value: 1
      }
    ]
    let myChart = init(document.getElementById('typeInfo') as HTMLElement)
    myChart.setOption(option)
    window.onresize = function () {
      myChart.resize()
    }
  }

  onMounted(() => {
    nextTick(() => {
      queryTypeInfo()
    })
  })
</script>

<style lang="scss" scoped>
  .typeInfo {
    width: 100%;
    height: 100%;
  }
</style>

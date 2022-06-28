<script lang="ts" setup>
  import { Recordable, Nullable } from '#/global'
  import { DataTableInst, DataTableColumn, NDataTable } from 'naive-ui'
  import { ResultTable, StateProp } from './types/index'
  import { basicProps } from './props'

  const props = defineProps({ ...basicProps })
  const tableRef = ref<Nullable<DataTableInst>>(null)
  const state = reactive<StateProp>({
    tableTotal: 0,
    page: 1,
    pageSize: 10,
    tableData: [],
    loading: false
  })
  // 加载
  const getLoading = computed(() => {
    return unref(state.loading)
  })
  // 表头
  const getColumns = computed(() => {
    const columns = unref(props).columns as DataTableColumn[]
    const actionColumn = unref(props).actionColumn
    if (actionColumn) {
      columns.push(actionColumn)
    }
    console.log('columns')
    console.log(columns)
    if (!columns) return []
    return columns.map(item => {
      return { ...item, align: item.align || 'center' }
    })
  })
  // RowKey
  const getRowKey = computed(() => {
    const { rowKey }: any = unref(props)
    const defaultRowKey = row => {
      return row.id
    }
    return rowKey ?? defaultRowKey
  })
  // 组装表格信息
  const getBindValues = computed(() => {
    return {
      ...unref(props),
      loading: unref(getLoading),
      rowKey: unref(getRowKey),
      columns: unref(getColumns),
      data: unref(state.tableData),
      remote: true
    }
  })
  // 分页
  const pagination = computed(() => {
    return {
      ...unref(props).pagination,
      page: state.page,
      pageSize: state.pageSize,
      itemCount: state.tableTotal,
      showQuickJumper: true
    }
  })
  watch(
    () => props.data,
    () => {
      state.tableData = props.data as Recordable[]
    },
    {
      deep: true
    }
  )
  // page 改变时触发
  function updatePage(page: number) {
    state.page = page
    fetchPageList()
  }
  // page-size 改变时触发
  function updatePageSize(pageSize: number) {
    state.pageSize = pageSize
    fetchPageList()
  }
  // 请求接口
  function fetchPageList() {
    const { apiProps } = unref(props)
    if (apiProps && apiProps.request) {
      const params: Recordable = Object.assign(
        {
          page: state.page,
          pageSize: state.pageSize
        },
        apiProps?.params
      )
      // setTimeout 解决取消重复请求 loading 无效问题
      setTimeout(() => {
        state.loading = true
      }, 0)
      state.tableData = []
      apiProps
        .request(params)
        .then((res: ResultTable) => {
          state.tableData = res.data.list
          state.tableTotal = res.data.total
        })
        .finally(() => {
          state.loading = false
        })
    } else {
      ;(window as any).$message.warning('apiProps 不能为空')
    }
  }
  // 首次加载
  onMounted(() => {
    const { hasExecute } = unref(props)
    hasExecute && fetchPageList()
  })
  defineExpose({
    fetchPageList
  })
</script>
<template>
  <div class="table-container">
    <div class="operation-wrapper">
      <slot name="operation"></slot>
    </div>
    <div class="table-wrapper">
      <n-data-table
        ref="tableRef"
        v-bind="getBindValues"
        :pagination="pagination"
        @update:page="updatePage"
        @update:page-size="updatePageSize"
      >
        <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </n-data-table>
    </div>
  </div>
</template>

<style lang="scss">
  .table-container {
    .operation-wrapper {
      margin-bottom: 15px;
    }
  }
</style>

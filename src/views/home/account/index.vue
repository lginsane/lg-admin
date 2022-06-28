<script lang="ts" setup>
  import { pageCardOption, SearchSchemas, tableColumns } from './constant/index'
  import { getPageList } from '@/api/home/account'
  import { APIProps } from '@/components/Table/types/index'
  const accountTableRef = ref(null)
  // table apiProps
  const tableApiProps = reactive<APIProps>({
    params: {},
    request: loadDataTable
  })

  async function loadDataTable(params) {
    return await getPageList(params)
  }

  function onSubmit(data) {
    tableApiProps.params = data
    nextTick(() => {
      ;(accountTableRef?.value as any)?.fetchPageList()
    })
  }
</script>
<template>
  <Page class="account-container" :card-option="pageCardOption">
    <template #account>
      <SearchTable :schemas="SearchSchemas" @submit="onSubmit"></SearchTable>
      <Table
        ref="accountTableRef"
        :api-props="tableApiProps"
        :columns="tableColumns"
        bordered
      ></Table>
    </template>
  </Page>
</template>

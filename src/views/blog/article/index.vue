<script lang="ts" setup>
  import { pageCardOption, SearchSchemas, tableColumns } from './constant/index'
  import { getPageList } from '@/api/blog/article'
  import { APIProps } from '@/components/Table/types/index'
  import TableAction from '@/components/Table/components/TableAction.vue'

  const router = useRouter()
  const articleTableRef = ref(null)
  // table apiProps
  const tableApiProps = reactive<APIProps>({
    params: {},
    request: loadDataTable
  })

  const actionColumn = {
    width: 100,
    title: '操作',
    key: 'action',
    // fixed: 'right',
    render: row => {
      return h(TableAction as any, {
        actions: [
          {
            label: '编辑',
            size: 'small',
            type: 'primary',
            onClick: () => {
              router.push(`/blog/article/update/${row.id}`)
            }
          },
          {
            label: '删除',
            size: 'small',
            type: 'error',
            isConfirm: true,
            onConfirm: () => {
              console.log(`删除: ${row.id}`)
            }
          }
        ]
      })
    }
  }

  async function loadDataTable(params) {
    return await getPageList(params)
  }

  function onSubmit(data) {
    tableApiProps.params = data
    nextTick(() => {
      ;(articleTableRef?.value as any)?.fetchPageList()
    })
  }
  function onAdd() {
    console.log('添加')
    router.push('/blog/article/add')
  }
</script>
<template>
  <Page class="article-container" :card-option="pageCardOption">
    <template #article>
      <SearchTable :schemas="SearchSchemas" @submit="onSubmit"></SearchTable>
      <Table
        ref="articleTableRef"
        :api-props="tableApiProps"
        :columns="tableColumns"
        :action-column="actionColumn"
        bordered
      >
      </Table>
    </template>
    <template #article-action>
      <n-button type="primary" quaternary @click="onAdd">添加文章</n-button>
    </template>
  </Page>
</template>

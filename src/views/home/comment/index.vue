<script lang="ts" setup>
  import { pageCardOption, SearchSchemas, tableColumns } from './constant/index'
  import { getPageList, remove } from '@/api/home/comment'
  import { APIProps } from '@/components/Table/types/index'
  import { ReplyType } from '@/api/home/comment/model'
  import TableAction from '@/components/Table/components/TableAction.vue'
  const commentTableRef = ref(null)
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
            label: '回复',
            size: 'small',
            type: 'primary',
            onClick: () => {
              showModal.value = true
              formModel.value.id = row.id
            }
          },
          {
            label: '删除',
            size: 'small',
            type: 'error',
            isConfirm: true,
            onConfirm: () => {
              remove(row.id).then(() => {
                ;(window as any).$message.success('删除成功')
              })
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
      ;(commentTableRef?.value as any)?.fetchPageList()
    })
  }
  // 弹窗
  const showModal = ref(false)
  const formRef = ref()
  const formBtnLoading = ref(false)
  const formModel = ref<ReplyType>({
    id: 0,
    comment: ''
  })
  const formRules = {
    comment: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入回复内容'
    }
  }
  function onAdd() {
    showModal.value = true
  }
  function confirmForm() {}
  function cancelForm() {
    // 初始化
    formModel.value = {
      id: 0,
      comment: ''
    }
    formRef.value.restoreValidation()
    showModal.value = false
  }
</script>
<template>
  <Page class="comment-container" :card-option="pageCardOption">
    <template #comment>
      <SearchTable
        :schemas="SearchSchemas"
        :showResetButton="false"
        :showAdvancedButton="false"
        @submit="onSubmit"
      ></SearchTable>
      <Table
        ref="commentTableRef"
        :api-props="tableApiProps"
        :columns="tableColumns"
        :action-column="actionColumn"
        bordered
      >
      </Table>
      <n-modal
        v-model:show="showModal"
        :show-icon="false"
        title="回复评论"
        preset="dialog"
        :on-after-leave="cancelForm"
      >
        <n-form
          ref="formRef"
          v-model:value="formModel"
          :rules="formRules"
          label-placement="left"
          :label-width="80"
          style="padding: 1em 0"
        >
          <n-form-item label="回复内容" path="comment">
            <n-input v-model:value="formModel.comment" placeholder="请输入回复内容" clearable />
          </n-form-item>
        </n-form>

        <template #action>
          <n-space>
            <n-button @click="cancelForm">取消</n-button>
            <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </template>
    <template #comment-action>
      <n-button type="primary" quaternary @click="onAdd">标记全部已读</n-button>
    </template>
  </Page>
</template>

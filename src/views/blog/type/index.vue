<script lang="ts" setup>
  import { pageCardOption, tableColumns } from './constant/index'
  import { getPageList, remove } from '@/api/blog/type'
  import { APIProps } from '@/components/Table/types/index'
  import { TypeItem } from '@/api/blog/type/model'
  import TableAction from '@/components/Table/components/TableAction.vue'
  const typeTableRef = ref(null)
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
              showModal.value = true
              title.value = '编辑'
              formModel.value = row
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

  // 弹窗
  const title = ref('')
  const showModal = ref(false)
  const formRef = ref()
  const formBtnLoading = ref(false)
  const formModel = ref<TypeItem>({
    id: undefined,
    name: '',
    describe: '',
    createTime: '',
    updateTime: ''
  })
  const formRules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入分类名称'
    },
    describe: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入分类描述'
    }
  }
  function onAdd() {
    console.log('添加')
    showModal.value = true
    title.value = '添加'
  }
  function confirmForm() {}
  function cancelForm() {
    // 初始化
    formModel.value = {
      id: undefined,
      name: '',
      describe: '',
      createTime: '',
      updateTime: ''
    }
    formRef.value.restoreValidation()
    showModal.value = false
  }
</script>
<template>
  <Page class="type-container" :card-option="pageCardOption">
    <template #type>
      <Table
        ref="typeTableRef"
        :api-props="tableApiProps"
        :columns="tableColumns"
        :action-column="actionColumn"
        bordered
      >
      </Table>
      <n-modal
        v-model:show="showModal"
        :show-icon="false"
        :title="title"
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
          <n-form-item label="分类名称" path="name">
            <n-input v-model:value="formModel.name" placeholder="请输入分类名称" clearable />
          </n-form-item>
          <n-form-item label="分类描述" path="describe">
            <n-input v-model:value="formModel.describe" placeholder="请输入分类描述" clearable />
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
    <template #type-action>
      <n-button type="primary" quaternary @click="onAdd">添加分类</n-button>
    </template>
  </Page>
</template>

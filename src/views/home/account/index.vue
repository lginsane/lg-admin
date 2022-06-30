<script lang="ts" setup>
  import {
    pageCardOption,
    SearchSchemas,
    tableColumns,
    statusOptions,
    sexOptions,
    permissionOptions
  } from './constant/index'
  import { getPageList, enable, disable } from '@/api/home/account'
  import { APIProps } from '@/components/Table/types/index'
  import { AccountItem } from '@/api/home/account/model'
  import TableAction from '@/components/Table/components/TableAction.vue'
  const accountTableRef = ref(null)
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
            label: '启用',
            size: 'small',
            type: 'success',
            isShow: row.status === 0,
            isConfirm: true,
            onConfirm: () => {
              console.log(`启用成功: ${row.id}`)
              enable(row.id).then(() => {
                ;(window as any).$message.success('启用成功')
              })
            }
          },
          {
            label: '禁用',
            size: 'small',
            type: 'error',
            isShow: row.status === 1,
            isConfirm: true,
            onConfirm: () => {
              console.log(`禁用成功: ${row.id}`)
              disable(row.id).then(() => {
                ;(window as any).$message.success('禁用成功')
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
      ;(accountTableRef?.value as any)?.fetchPageList()
    })
  }
  // 弹窗
  const title = ref('')
  const showModal = ref(false)
  const formBtnLoading = ref(false)
  const formModel = ref<AccountItem>({
    id: undefined,
    account: '',
    nickname: '',
    password: '',
    sex: 1,
    status: 1,
    permission: 0,
    createTime: '',
    updateTime: ''
  })
  const formRules = {
    account: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入账户'
    },
    nickname: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入昵称'
    },
    password: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入密码'
    },
    sex: {
      required: true,
      trigger: ['change'],
      message: '请选择性别'
    },
    permission: {
      required: true,
      trigger: ['change'],
      message: '请选择权限'
    },
    status: {
      required: true,
      trigger: ['change'],
      message: '请选择状态'
    }
  }
  function onAdd() {
    console.log('添加')
    showModal.value = true
    title.value = '添加'
  }
  function confirmForm() {}
</script>
<template>
  <Page class="account-container" :card-option="pageCardOption">
    <template #account>
      <SearchTable :schemas="SearchSchemas" @submit="onSubmit"></SearchTable>
      <Table
        ref="accountTableRef"
        :api-props="tableApiProps"
        :columns="tableColumns"
        :action-column="actionColumn"
        bordered
      >
      </Table>
      <n-modal v-model:show="showModal" :show-icon="false" :title="title" preset="dialog">
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          label-placement="left"
          :label-width="80"
          style="padding: 1em 0"
        >
          <n-form-item label="账户" path="account">
            <n-input v-model:value="formModel.account" placeholder="请输入账户" clearable />
          </n-form-item>
          <n-form-item label="昵称" path="nickname">
            <n-input v-model:value="formModel.nickname" placeholder="请输入昵称" clearable />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="formModel.password"
              type="password"
              placeholder="请输入密码"
              show-password-on="click"
              clearable
            />
          </n-form-item>
          <n-form-item label="性别" path="sex">
            <n-select
              v-model:value="formModel.sex"
              :options="sexOptions"
              placeholder="请选择性别"
              clearable
            />
          </n-form-item>
          <n-form-item label="权限" path="permission">
            <n-select
              v-model:value="formModel.permission"
              :options="permissionOptions"
              placeholder="请选择性别"
              clearable
            />
          </n-form-item>
          <n-form-item label="状态" path="status">
            <n-select
              v-model:value="formModel.status"
              :options="statusOptions"
              placeholder="请选择状态"
              clearable
            />
          </n-form-item>
        </n-form>

        <template #action>
          <n-space>
            <n-button @click="() => (showModal = false)">取消</n-button>
            <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </template>
    <template #account-action>
      <n-button type="primary" quaternary @click="onAdd">添加账户</n-button>
    </template>
  </Page>
</template>

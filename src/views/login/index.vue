<script lang="ts" setup>
  import { useMessage } from 'naive-ui'
  import { useUserStore } from '@/store/modules/user'
  interface FormState {
    account: string
    password: string
  }

  const message = useMessage()
  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()

  const loading = ref(false)
  const formRef = ref(null)
  const formModel = reactive({
    account: 'admin',
    password: '123456',
    isCaptcha: true
  })
  const formRules = {
    account: {},
    password: {}
  }
  function handleSubmit(e) {
    e.preventDefault()
    ;(formRef as any).value.validate(async errors => {
      if (!errors) {
        message.loading('登录中...')
        loading.value = true
        const { account, password } = formModel
        const params: FormState = {
          account,
          password
        }
        try {
          await userStore.login(params)
          message.destroyAll()
          message.success('登录成功，即将进入系统')
          setTimeout(() => {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
            if (toPath) {
              router.replace(toPath)
            } else router.replace('/')
          }, 200)
        } finally {
          loading.value = false
        }
      } else {
        message.error('请填写完整信息')
      }
    })
  }
</script>
<template>
  <div class="login-wrapper">
    <div class="from-wrapper">
      <h2 class="title">个人管理后台</h2>
      <n-form ref="formRef" :model="formModel" :rules="formRules" label-placement="left">
        <n-form-item path="account" label="账号">
          <n-input v-model:value="formModel.account" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="formModel.password" type="password" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item>
          <n-checkbox v-model:checked="formModel.isCaptcha">自动登录</n-checkbox>
        </n-form-item>
        <n-form-item>
          <n-button type="primary" size="large" :loading="loading" block @click="handleSubmit">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style lang="scss">
  .login-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    .from-wrapper {
      width: 500px;
      // height: 500px;
      padding: 30px 20px;
      background-color: #fff;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
      .title {
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
</style>

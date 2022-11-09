<script lang="ts" setup>
  import { isUrl } from '@/utils/is'
  import { MineType } from '@/api/blog/mine/model'
  import { AddCircleSharp, RemoveCircle } from '@vicons/ionicons5'
  const formModel = ref<MineType>({
    name: '',
    signature: '',
    avatar: '',
    links: [
      {
        title: '',
        url: '',
        icon: ''
      }
    ],
    content: ''
  })
  const formRules = {
    name: {
      required: true,
      message: '请输入名称',
      trigger: ['blur']
    },
    signature: {
      required: true,
      message: '请输入签名',
      trigger: ['blur']
    },
    avatar: {
      required: true,
      message: '请上传头像',
      trigger: ['change', 'blur']
    },
    content: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入内容'
    }
  }
  const urlValidator = (_, value: string) => {
    if (!value) {
      return Error('请输入链接地址')
    } else if (!isUrl(value)) {
      return Error('不符合url规则')
    } else {
      return true
    }
  }
  const mdChange = val => {
    formModel.value.content = val
  }
  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      Array.from(files).map(file => {
        return new Promise(resolve => {
          const form = new FormData()
          form.append('file', file as Blob)
          // axios
          //   .post('/api/img/upload', form, {
          //     headers: {
          //       'Content-Type': 'multipart/form-data'
          //     }
          //   })
          //   .then(res => resolve(res))
          //   .catch(error => reject(error))
          resolve(true)
        })
      })
    )
    callback(res.map(item => item))
  }
  // 新增链接
  function onAddLink(index: number) {
    formModel.value.links.splice(index, 0, {
      title: '',
      url: '',
      icon: ''
    })
  }
  // 删除链接
  function onDeleteLink(index: number) {
    formModel.value.links.splice(index, 1)
  }
</script>
<template>
  <Page>
    <n-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-width="80"
      label-placement="left"
    >
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-form-item label="名称" path="name">
            <n-input
              v-model:value="formModel.name"
              placeholder="请输入名称"
              maxlength="10"
              show-count
              clearable
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="头像" path="avatar">
            <ImageUpload v-model:value="formModel.avatar"></ImageUpload>
          </n-form-item>
        </n-gi>
        <n-gi span="1">
          <div v-for="(link, index) in formModel.links" :key="index" class="link-wrapper">
            <div class="link-operation">
              <n-icon size="24" color="#2D6FFF" @click="onAddLink(index)">
                <AddCircleSharp />
              </n-icon>
              <n-icon v-if="index !== 0" size="24" color="#2D6FFF" @click="onDeleteLink(index)">
                <RemoveCircle />
              </n-icon>
            </div>
            <n-form-item
              label="链接名称"
              :path="'links.' + index + '.title'"
              :rule="{
                required: true,
                message: '请输入链接名称',
                trigger: 'blur'
              }"
            >
              <n-input
                v-model:value="link.title"
                placeholder="请输入链接名称"
                maxlength="10"
                show-count
                clearable
              />
            </n-form-item>
            <n-form-item
              label="链接地址"
              :path="'links.' + index + '.url'"
              :rule="{
                required: true,
                trigger: 'blur',
                validator: urlValidator
              }"
            >
              <n-input v-model:value="link.url" placeholder="请输入链接地址" clearable />
            </n-form-item>
            <n-form-item
              label="链接图标"
              :path="'links.' + index + '.icon'"
              :rule="{
                required: true,
                trigger: 'blur',
                message: '请输入链接图标'
              }"
            >
              <n-input v-model:value="link.icon" placeholder="请输入链接图标" clearable />
            </n-form-item>
          </div>
        </n-gi>
        <n-gi span="2">
          <n-form-item label="签名" path="signature">
            <n-input
              v-model:value="formModel.signature"
              type="textarea"
              placeholder="请输入签名"
              maxlength="30"
              show-count
              clearable
            />
          </n-form-item>
        </n-gi>
        <n-gi span="2">
          <n-form-item label="内容" path="content">
            <md-editor
              v-model="formModel.content"
              placeholder="请输入内容"
              :style="{ minHeight: '600px' }"
              @change="mdChange"
              @on-upload-img="onUploadImg"
            />
          </n-form-item>
        </n-gi>
      </n-grid>
    </n-form>
  </Page>
</template>

<style lang="scss">
  .link-wrapper {
    position: relative;
    .link-operation {
      height: 34px;
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(100%);
      .n-icon {
        cursor: pointer;
        margin-left: 15px;
        &:nth-child(2) {
          margin-left: 5px;
        }
      }
    }
  }
</style>

<script lang="ts" setup>
  import { ArticleItem } from '@/api/blog/article/model'
  import { statusOptions } from '../constant/index'
  import { initData } from '../hooks/index'
  const route = useRoute()
  // 是否编辑
  const isEditor: boolean = !!route.params.id
  console.log(isEditor)
  const { typeOptions, tagOptions } = initData()
  const formModel = ref<ArticleItem>({
    id: undefined,
    title: '',
    desc: '',
    sortNo: null,
    type: null,
    status: 1,
    tags: [],
    coverImg: '',
    content: '',
    createTime: '',
    updateTime: ''
  })
  function init() {}
  const formRules = {
    title: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入标题'
    },
    desc: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入描述'
    },
    type: {
      required: true,
      trigger: ['change'],
      message: '请选择分类'
    },
    tags: {
      required: true,
      trigger: ['change'],
      message: '请选择标签'
    },
    coverImg: {
      required: true,
      message: '请上传封面',
      trigger: ['change', 'blur']
    },
    status: {
      required: true,
      trigger: ['change'],
      message: '请选择状态'
    },
    content: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入内容'
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
  onMounted(() => {
    // 编辑获取数据
    if (isEditor) [init()]
  })
</script>
<template>
  <n-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    label-placement="left"
    :label-width="80"
    style="padding: 1em 0"
  >
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-form-item label="标题" path="title">
          <n-input v-model:value="formModel.title" placeholder="请输入标题" clearable />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="分类" path="type">
          <n-select
            v-model:value="formModel.type"
            :options="typeOptions"
            placeholder="请选择分类"
            clearable
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="标签" path="tags">
          <n-select
            v-model:value="formModel.tags"
            :options="tagOptions"
            placeholder="请选择标签"
            clearable
            multiple
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="封面" path="coverImg">
          <ImageUpload v-model:value="formModel.coverImg"></ImageUpload>
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="状态" path="status">
          <n-select
            v-model:value="formModel.status"
            :options="statusOptions"
            placeholder="请选择状态"
            clearable
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="顺序" path="sortNo">
          <n-input v-model:value="formModel.sortNo" placeholder="请输入昵称" clearable />
        </n-form-item>
      </n-gi>
      <n-gi span="2">
        <n-form-item label="描述" path="desc">
          <n-input
            v-model:value="formModel.desc"
            type="textarea"
            placeholder="请输入描述"
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
</template>

<script lang="ts" setup>
  // 图片地址
  const url = ref('')
  // 输入框提示语
  const placeholder = ref('请输入图片链接')
  // 上传状态 0: 未上传 1: 上传中 2: 上传成功 3: 上传失败
  const uploadStatus = ref(0)
</script>
<template>
  <div class="upload-container">
    <n-input v-model:value="url" :placeholder="placeholder" class="upload-input" />
    <n-button class="upload-button" type="primary" text>点击上传图片</n-button>
    <!-- 成功 -->
    <n-button v-if="url" class="upload-button" type="primary" text>预览</n-button>
    <!-- 上传中 -->
    <n-button v-if="uploadStatus === 1" class="upload-button" type="error" text>取消上传</n-button>
  </div>
</template>

<style lang="scss">
  .upload-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .upload-input {
    flex: 1;
  }
  .upload-button {
    margin-left: 15px;
    cursor: pointer;
  }
</style>

<script lang="ts" setup>
  import ArticleForm from '../components/article-form.vue'
  const formBtnLoading = ref(false)

  function confirmForm() {}
</script>

<template>
  <Page class="article-add-container">
    <ArticleForm></ArticleForm>
    <n-space>
      <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
    </n-space>
  </Page>
</template>

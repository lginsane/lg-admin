<script lang="ts" setup>
  interface CardOptionItem {
    bordered?: boolean
    title?: string
    slotName?: string
    isCard?: boolean
    class?: string
  }
  interface Props {
    hideBreadcrumb?: boolean
    cardOption?: CardOptionItem[]
  }
  withDefaults(defineProps<Props>(), {
    hideBreadcrumb: false,
    cardOption: () => []
  })
</script>
<template>
  <div class="page-wrapper">
    <n-page-header>
      <template v-if="!hideBreadcrumb" #header>
        <div ref="breadcrumb" class="breadcrumb-wrapper area-width">
          <Breadcrumb />
        </div>
      </template>
    </n-page-header>
    <div class="page-content" :class="hideBreadcrumb && 'page-height'">
      <template v-if="cardOption && cardOption.length">
        <template v-for="(option, index) in cardOption">
          <n-card
            v-if="option.isCard"
            :key="'card' + index"
            class="card-wrapper area-width"
            :class="option.class"
            :bordered="option.bordered || false"
            :title="option.title"
          >
            <template #header-extra>
              <slot :name="option.slotName + '-action'"></slot>
            </template>
            <slot :name="option.slotName"></slot>
          </n-card>
          <div v-else :key="index" class="grid-wrapper area-width">
            <slot :name="option.slotName"></slot>
          </div>
        </template>
      </template>
      <n-card v-else class="area-width">
        <slot></slot>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss">
  .page-wrapper {
    height: $LayoutPageHeight;
    box-sizing: border-box;
    overflow: auto;
    .n-page-header-header {
      margin-bottom: 0;
      background-color: #f5fafd;
    }
    .breadcrumb-wrapper {
      height: $BreadcrumbHeight;
      display: flex;
      align-items: center;
    }
    .banner-wrapper {
      margin-bottom: 15px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    .page-content {
      height: calc(100% - $BreadcrumbHeight);
      box-sizing: border-box;
      overflow: auto;
      &.page-height {
        height: 100%;
      }
      .card-wrapper + .card-wrapper,
      .grid-wrapper + .grid-wrapper,
      .grid-wrapper + .card-wrapper,
      .card-wrapper + .grid-wrapper {
        margin-top: 15px;
      }
      .grid-wrapper .grid-item {
        width: 100%;
        display: block;
        background-color: #fff;
      }
    }
  }
  .mt-15 {
    margin-top: 15px !important;
  }
</style>

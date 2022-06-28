<script lang="ts" setup>
  import { basicProps } from './props'
  defineProps({ ...basicProps })
</script>
<template>
  <div class="page-wrapper">
    <n-page-header>
      <template v-if="!hideBreadcrumb" #header>
        <div ref="breadcrumb" class="breadcrumb-wrapper">
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
            class="card-wrapper"
            :class="option.class"
            :bordered="option.bordered || false"
            :title="option.title"
          >
            <template #header-extra>
              <slot :name="option.slotName + '-action'"></slot>
            </template>
            <slot :name="option.slotName"></slot>
          </n-card>
          <div v-else :key="index" class="grid-wrapper">
            <slot :name="option.slotName"></slot>
          </div>
        </template>
      </template>
      <n-card v-else :bordered="false">
        <slot></slot>
      </n-card>
    </div>
  </div>
</template>

<style lang="scss">
  .page-wrapper {
    width: 100%;
    height: $LayoutPageHeight;
    box-sizing: border-box;
    overflow: auto;
    .n-page-header-header {
      margin-bottom: 0;
      background-color: #fff;
      padding: 0 15px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }
    .breadcrumb-wrapper {
      height: $BreadcrumbHeight;
      display: flex;
      align-items: center;
    }
    .page-content {
      height: calc(100% - $BreadcrumbHeight);
      box-sizing: border-box;
      overflow: auto;
      padding: 15px;
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

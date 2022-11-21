<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <global-mount />
          <slot name="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

/**
 * 全局注册自定义组件 待完善
 * @param app
 */

import type { App } from 'vue'
import PageWrapper from '@/components/Page/index.vue'

export function setupCustomComponents(app: App<Element>) {
  app.component('page-wrapper', PageWrapper)
}

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupCustomComponents, setupNaive } from '@/components/index'
import { setupStore } from '@/store/index'
import Application from '@/components/Application/index.vue'

import '@/styles/index.scss'

async function bootstrap() {
  const application = createApp(Application)
  const app = createApp(App)
  // 注册Naive组件
  setupNaive(app)
  // 注册全局自定义组件
  setupCustomComponents(app)
  // 挂载状态管理
  setupStore(app)

  // 优先挂载 application
  // 解决路由守卫、Axios中可使用 window 挂载的全局方法
  // 挂载全局方法的路径：/src/components/Application/GlobalMount.vue
  application.mount('#application', true)
  // 挂载路由
  await setupRouter(app)

  app.mount('#app')
}
bootstrap()

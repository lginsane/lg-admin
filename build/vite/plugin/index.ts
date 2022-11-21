import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import { autoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { configCompressPlugin } from './compress'

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    // 自动按需引入组件
    autoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps()
  ]

  // 压缩
  isBuild && vitePlugins.push(configCompressPlugin())
  return vitePlugins
}

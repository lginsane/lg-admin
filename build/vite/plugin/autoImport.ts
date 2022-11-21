/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入依赖
 */
import AutoImport from 'unplugin-auto-import/vite'

export const AutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router', '@vueuse/core'],
    dts: 'types/auto-imports.d.ts',
    eslintrc: {
      enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true
    }
  })

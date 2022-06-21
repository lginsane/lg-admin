/**
 * @name autoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export const autoRegistryComponents = () => {
  return Components({
    resolvers: [NaiveUiResolver()]
  })
}

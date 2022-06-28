/**
 * 全局注册自定义组件 待完善
 * @param app
 */

import type { App } from 'vue'
import {
  create,
  NInput,
  NInputGroup,
  NInputNumber,
  NSelect,
  NTreeSelect,
  NRadioGroup,
  NCheckbox,
  NCheckboxGroup,
  NAutoComplete,
  NCascader,
  NDatePicker,
  NTimePicker,
  NSwitch,
  NUpload,
  NSlider,
  NRate
} from 'naive-ui'
import PageWrapper from '@/components/Page/index.vue'

export function setupCustomComponents(app: App<Element>) {
  app.component('PageWrapper', PageWrapper)
}

const naive = create({
  components: [
    NInput,
    NInputGroup,
    NInputNumber,
    NSelect,
    NTreeSelect,
    NRadioGroup,
    NCheckbox,
    NCheckboxGroup,
    NAutoComplete,
    NCascader,
    NDatePicker,
    NTimePicker,
    NSwitch,
    NUpload,
    NSlider,
    NRate
  ]
})

export function setupNaive(app: App<Element>) {
  app.use(naive)
}

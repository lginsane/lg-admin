<script lang="ts" setup>
  import { isNullOrUnDef } from '@/utils/is'
  import { Recordable, Nullable } from '#/global'
  import { ChevronDownOutline, ChevronUpOutline } from '@vicons/ionicons5'
  import { FormInst } from 'naive-ui'
  import { SchemaItem } from './types/index'
  import { basicProps } from './props'

  const props = defineProps({ ...basicProps })
  const emit = defineEmits(['reset', 'submit'])
  const formModel = reactive<Recordable>({})
  const defaultFormModel = ref<Recordable>({})
  const gridCollapsed = ref(true)
  const isUpdateDefaultRef = ref(false)
  const formRef = ref<Nullable<FormInst>>(null)
  const loadingSub = ref(false)
  // 表单配置项
  const getSchema = computed((): SchemaItem[] => {
    const schemas: SchemaItem[] = unref(props).schemas
    for (const schema of schemas) {
      const { defaultValue } = schema
      schema.defaultValue = defaultValue || undefined
    }
    return schemas as SchemaItem[]
  })
  // 组件配置项
  function getComponentProps(schema) {
    const compProps = schema.componentProps ?? {}
    return {
      clearable: true,
      ...compProps
    }
  }
  // 折叠
  function unfoldToggle() {
    gridCollapsed.value = !gridCollapsed.value
  }
  // 初始化数据
  function initDefaultValue() {
    const schemas = unref(getSchema)
    const obj: Recordable = {}
    schemas.forEach(item => {
      const { defaultValue } = item
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.path] = defaultValue
        formModel[item.path] = defaultValue
      }
    })
    defaultFormModel.value = obj
  }
  watch(
    () => getSchema.value,
    schema => {
      if (unref(isUpdateDefaultRef)) {
        return
      }
      if (schema?.length) {
        initDefaultValue()
        isUpdateDefaultRef.value = true
      }
    }
  )
  onMounted(() => {
    initDefaultValue()
  })
  // 验证
  async function validate() {
    return unref(formRef)?.validate()
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault()
    loadingSub.value = true
    const formEl = unref(formRef)
    if (!formEl) return
    try {
      await validate()
      emit('submit', formModel)
      loadingSub.value = false
      return
    } catch (error) {
      loadingSub.value = false
    }
  }
  // 清空校验
  async function clearValidate() {
    // @ts-ignore
    await unref(formRef)?.restoreValidation()
  }

  // 重置
  async function resetPaths(): Promise<void> {
    const formEl = unref(formRef)
    if (!formEl) return
    Object.keys(formModel).forEach(key => {
      formModel[key] = unref(defaultFormModel)[key] || null
    })
    await clearValidate()
    const fromValues = toRaw(unref(formModel))
    emit('reset', fromValues)
    unref(props).submitOnReset && (await handleSubmit())
  }
</script>

<template>
  <div class="search-container">
    <n-form ref="formRef" :model="formModel" :label-width="labelWidth" label-placement="left">
      <n-grid :collapsed="gridCollapsed" :cols="'1 s:1 m:2 l:3 xl:4 2xl:4'" responsive="screen">
        <n-gi v-for="schema in getSchema" :key="schema.path">
          <n-form-item :label="schema.label" :path="schema.path">
            <!--判断插槽-->
            <template v-if="schema.slot">
              <slot
                :name="schema.slot"
                :model="formModel"
                :path="schema.path"
                :value="formModel[schema.path]"
              ></slot>
            </template>
            <component
              :is="schema.component"
              v-else
              v-bind="getComponentProps(schema)"
              v-model:value="formModel[schema.path]"
              class="isFull"
            />
          </n-form-item>
        </n-gi>
        <!-- 搜索/重置 -->
        <n-gi #="{ overflow }" suffix>
          <n-space align="center" justify="start" :style="{ 'margin-left': `${labelWidth}px` }">
            <n-button
              v-if="showSubmitButton"
              type="primary"
              :loading="loadingSub"
              @click="handleSubmit"
            >
              搜索
            </n-button>
            <n-button v-if="showResetButton" type="primary" @click="resetPaths">重置</n-button>
            <n-button
              v-if="showAdvancedButton"
              type="primary"
              text
              icon-placement="right"
              @click="unfoldToggle"
            >
              <template #icon>
                <n-icon v-if="overflow" size="14" class="unfold-icon">
                  <ChevronDownOutline />
                </n-icon>
                <n-icon v-else size="14" class="unfold-icon">
                  <ChevronUpOutline />
                </n-icon>
              </template>
              {{ overflow ? '展开' : '收起' }}
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<style lang="scss">
  .isFull {
    width: 100%;
  }
  .unfold-icon {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: -3px;
  }
</style>

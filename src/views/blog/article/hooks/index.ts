export function initData() {
  const typeOptions = reactive([
    {
      label: '类型1',
      value: 1
    },
    {
      label: '类型2',
      value: 2
    }
  ])
  const tagOptions = reactive([
    {
      label: '标签1',
      value: 1
    },
    {
      label: '标签2',
      value: 2
    }
  ])
  return {
    typeOptions,
    tagOptions
  }
}

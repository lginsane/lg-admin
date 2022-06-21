import { useLayoutStore } from '@/store/layout'
import { storeToRefs } from 'pinia'

export function useHasMobile() {
  const layoutStore = useLayoutStore()
  const { hasMobile } = storeToRefs(layoutStore)
  return {
    hasMobile
  }
}

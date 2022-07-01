import { RouteRecordName } from 'vue-router'
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'
import { PageEnum } from '@/enums/pageEnum'

export function useHasMobile() {
  const layoutStore = useLayoutStore()
  const { hasMobile } = storeToRefs(layoutStore)
  return {
    hasMobile
  }
}

export function useWhiteName(name: RouteRecordName) {
  const whiteNameList = [PageEnum.BASE_LOGIN_NAME, PageEnum.ERROR_PAGE_NAME, PageEnum.REDIRECT_NAME]
  const isWhiteName: boolean = whiteNameList.includes(name as PageEnum)
  return {
    isWhiteName
  }
}

import { defineStore } from 'pinia'
import { storage } from '@/utils/Storage'
import { ResultEnum } from '@/enums/httpEnum'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'
import { login, getUserInfo } from '@/api/user/index'
import { store } from '../index'

interface IUserState {
  token: string
  info: any
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    info: storage.get(CURRENT_USER, {})
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.info.avatar
    },
    getNickname(): string {
      return this.info.username
    },
    getUserInfo(): object {
      return this.info
    }
  },
  actions: {
    // 登录
    async login(userInfo) {
      try {
        const response = await login(userInfo)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000
          storage.setCookie(ACCESS_TOKEN, data.token, ex)
          this.token = data.token
        }
        return Promise.resolve(response)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    // 获取用户信息
    GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            const { data, code } = response
            if (code === ResultEnum.SUCCESS) {
              storage.set(CURRENT_USER, data)
              this.info = data
            }
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    async logout() {
      this.info = ''
      storage.removeCookie(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
      return Promise.resolve('')
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}

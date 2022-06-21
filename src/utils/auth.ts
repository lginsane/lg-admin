import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = 'YQ-SSO-COOKIE'

const cookies = useCookies([TokenKey])

export function getToken() {
  return cookies.get(TokenKey)
}

export function setToken(userToken) {
  return cookies.set(TokenKey, userToken)
}

export function removeToken() {
  return cookies.remove(TokenKey)
}

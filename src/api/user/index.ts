import { get, post } from '@/utils/http'
import { Result } from '../global'

// 登录
interface LoginData {
  account: string
  password: string
}
type LoginResult = Result<{
  token: string
}>
export const login = async (data: LoginData) => post<LoginResult>({ url: '/login', data })

// 获取用户信息
type UserInfoResult = Result<{
  nickname: string
  avatar: string
  email: string
  signature: string
  username: string
  phone: string
  roleId: number
}>
export const getUserInfo = async () => get<UserInfoResult>({ url: '/userInfo' })

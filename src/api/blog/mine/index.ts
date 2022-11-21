import { get, post } from '@/utils/http'
import { Result } from '../../global'
import { MineType } from './model'
// 查询
export const read = async () => get<Result<MineType>>({ url: '/mine/get' })

// 编辑
export const update = async (data: MineType) => post<Result<boolean>>({ url: '/mine/update', data })

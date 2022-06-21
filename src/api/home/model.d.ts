import { ExpandObjectType } from '#/global'
// 区块
export type BlockItemType = ExpandObjectType<{
  blockId: string
  blockHash: string
  transCount: number
  blockTime: string
}>

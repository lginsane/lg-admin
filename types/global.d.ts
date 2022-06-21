import type { PropType as VuePropType, ComputedRef, Ref } from 'vue'

// vue
declare type PropType<T> = VuePropType<T>

declare type Recordable<T = any> = Record<string, T>

declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}
export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

declare type EmitType = (event: any, ...args: any[]) => void

export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type ExpandObjectType<T> = T & Record<string, any>

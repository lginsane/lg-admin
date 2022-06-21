import { Recordable } from '#/global'
import { unref } from 'vue'
import { isObject } from './is'

/**
 * 根据地址栏地址或者url，获取key的值
 * @param {string} key
 * @param {string} url
 * @returns {string}
 */
export function getQueryValue(key: string, url?: string): string {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: Recordable = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj[key]
}
/**
 * 生产 n 位随机数(包含数字、字母)
 * @param {Number} n 位数
 * @returns {String}
 */
export function getRandomNum(n: number = 4): string {
  let randomVal: string = ''
  const selectChar: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < n; i++) {
    randomVal += selectChar[Math.floor(Math.random() * 61)]
  }
  return randomVal
}
/**
 * 只拷贝默认对象存在的属性
 * 如果您想使用完美的深度复制所有属性，请使用lodash的_.cloneDeep
 * @param {Object} source 拷贝对象
 * @param {Object} attrObj 默认对象
 * @returns {Object}
 */
export function deepClone(source: Recordable, attrObj: Recordable): Recordable {
  const isEmpty: boolean =
    source &&
    Object.prototype.toString.call(source) === '[object Object]' &&
    attrObj &&
    Object.prototype.toString.call(attrObj) === '[object Object]'
  if (!isEmpty) {
    throw new Error('方法 deepClone 传参错误')
  }

  const targetObj: Recordable = {}
  const attrs = Object.keys(attrObj)
  Object.keys(source).forEach(keys => {
    if (attrs.includes(keys)) {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * unref 处理 ref 值
 * @param props 参数
 * @returns 参数
 */
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).forEach(key => {
    ret[key] = unref((props as Recordable)[key])
  })
  return ret as Partial<U>
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

/**
 * 将已通过的百分数加到十六进制颜色的R、G或B
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的数量
 * @returns {string}
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount
  const c = cc > 255 ? 255 : cc
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * 根据通过的百分比，使6个字符的HEX颜色变亮
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的数量
 * @returns {string}
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
  amount = Math.trunc((255 * amount) / 100)
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`
}

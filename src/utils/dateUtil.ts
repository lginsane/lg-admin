import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date: dayjs.ConfigType = undefined,
  format = DATE_TIME_FORMAT
): string {
  return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(format)
}

export function formatToWeek(date: dayjs.ConfigType = undefined): string {
  const weeks: string = '日一二三四五六'
  const dayKey: number = dayjs(date).day()
  return weeks[dayKey]
}
export const dateUtil = dayjs

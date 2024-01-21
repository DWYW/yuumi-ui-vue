import { createRange, dateFormatter, dateParse } from "../../../share/helper"

export function getMonthDates(year: number, month: number) {
  const currStart = 1
  const currEnd = new Date(year, month + 1, 0, 0, 0, 0).getDate()
  const current = createRange(currStart, currEnd, item => {
    const value = new Date(year, month, item, 0, 0, 0)
    return { value, label: item.toString(), stamp: value.getTime(), isCurrentMonth: true }
  })

  const prevEnd = new Date(year, month, 0, 0, 0, 0).getDate()
  const prevStart = prevEnd - new Date(year, month, 1, 0, 0, 0).getDay() + 1
  const prev = createRange(prevStart, prevEnd, item => {
    const value = new Date(year, month - 1, item, 0, 0, 0)
    return { value, label: item.toString(), stamp: value.getTime(), isPrevMonth: true }
  })

  const nextStart = 1
  const nextEnd = 6 * 7 - current.length - prev.length
  const next = createRange(nextStart, nextEnd, item => {
    const value = new Date(year, month + 1, item, 0, 0, 0)
    return { value, label: item.toString(), stamp: value.getTime(), isNextMonth: true }
  })

  return ([] as any[]).concat(prev, current, next)
}

export function getDateZeroTime(value?: Date) {
  if (!value) return 0
  const { year, month, date } = dateParse(value)
  return new Date(year, month, date, 0, 0, 0).getTime()
}

export function dateMerge(target: Date, origin?: Date) {
  const res = target
  if (origin) {
    const { hours, minutes, seconds } = dateParse(origin)
    res.setHours(hours)
    res.setMinutes(minutes)
    res.setSeconds(seconds)
  }
  return res
}

export function getDisabledHours(method?: any, value?: Date, dependence?: Date) {
  if (!value) return []
  let suffix: number[] = []
  if (dependence && dateFormatter(value, "YYYYMMDD") === dateFormatter(dependence, "YYYYMMDD")) {
    suffix = createRange(0, dependence.getHours() - 1)
  }
  if (typeof method === "function") {
    const { year, month, date } = dateParse(value)
    const res = method({ year, month, date })
    return res.concat(suffix)
  }
  return suffix
}

export function getDisabledMinutes(method?: any, value?: Date, dependence?: Date) {
  if (!value) return []
  let suffix: number[] = []
  if (
    dependence &&
    dateFormatter(value, "YYYYMMDDhh") === dateFormatter(dependence, "YYYYMMDDhh")
  ) {
    suffix = createRange(0, dependence.getMinutes() - 1)
  }
  if (typeof method === "function") {
    const { year, month, date, hours } = dateParse(value)
    const res = method({ year, month, date, hours })
    return res.concat(suffix)
  }
  return suffix
}

export function getDisabledSeconds(method?: any, value?: Date, dependence?: Date) {
  if (!value) return []
  let suffix: number[] = []
  if (
    dependence &&
    dateFormatter(value, "YYYYMMDDhhmm") === dateFormatter(dependence, "YYYYMMDDhhmm")
  ) {
    suffix = createRange(0, dependence.getSeconds() - 1)
  }
  if (typeof method === "function") {
    const { year, month, date, hours, minutes } = dateParse(value)
    const res = method({ year, month, date, hours, minutes })
    return res.concat(suffix)
  }
  return suffix
}

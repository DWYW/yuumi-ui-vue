import { Comment, Fragment, VNode } from "vue"

export function getValueByPath<T = any>(data: any, path: string, resolve?: any): T {
  if (!path) return resolve !== undefined ? resolve : undefined

  const attrs = path.match(/\w+/g) || []
  let index = 0

  while (index < attrs.length && data !== null && data !== undefined) {
    data = data[attrs[index++]]
  }

  data = index && index === attrs.length ? data : undefined
  return (data === null || data === undefined) && resolve !== undefined ? resolve : data
}

export function getCss(element: any, attr: string) {
  if (element.currentStyle) {
    return element.currentStyle[attr]
  } else if (window.getComputedStyle && window.getComputedStyle(element, null)) {
    return window.getComputedStyle(element, null).getPropertyValue(attr)
  } else {
    return element.style[attr]
  }
}

export function getParentElementWithScroll(element: any): HTMLElement | Window {
  if (!(element instanceof HTMLElement)) return window

  switch (element.nodeName) {
    case "HTML":
    case "#document":
      return window
  }

  const overflow = getCss(element, "overflow")
  const overflowX = getCss(element, "overflowX")
  const overflowY = getCss(element, "overflowY")

  if (/auto|scroll/.test(overflow + overflowX + overflowY)) return element

  return getParentElementWithScroll(element.parentNode)
}

export function dateFormatter(value: Date, rule: string) {
  const year = value.getFullYear()
  const month = value.getMonth() + 1
  const date = value.getDate()
  const hours = value.getHours()
  const minutes = value.getMinutes()
  const seconds = value.getSeconds()

  return [
    [/Y{4,}/, year],
    [/Y{2,}/, year.toString().substr(2)],
    [/M{2,}/, `0${month}`.slice(-2)],
    [/M/, month],
    [/D{2,}/, `0${date}`.slice(-2)],
    [/D/, date],
    [/h{2,}/, `0${hours}`.slice(-2)],
    [/h/, hours],
    [/m{2,}/, `0${minutes}`.slice(-2)],
    [/m/, minutes],
    [/s{2,}/, `0${seconds}`.slice(-2)],
    [/s/, seconds]
  ].reduce((str, [reg, item]: any) => {
    return (str = str.replace(reg, item))
  }, rule)
}

export function dateParse(value: Date) {
  const year = value.getFullYear()
  const month = value.getMonth()
  const date = value.getDate()
  const hours = value.getHours()
  const minutes = value.getMinutes()
  const seconds = value.getSeconds()

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    stamp: value.getTime()
  }
}

export function timeParse(value: string | undefined, format: string): number[] {
  value = value || ""
  const values: number[] = (value.match(/\d+/g) || []).map((item: string) => Number(item))

  const idxs = format.match(/(h+)|(m+)|(s+)/g)?.reduce(
    (acc, item, index) => {
      const key = item.slice(0, 1)
      if (!acc[key]) {
        acc[key] = index
      }
      return acc
    },
    {} as { [x: string]: number }
  )
  if (!idxs) return []

  return [
    Math.min(values[idxs.h], 23) || 0,
    Math.min(values[idxs.m], 59) || 0,
    Math.min(values[idxs.s], 59) || 0
  ]
}

export function clearEmpty(object: { [key: string]: any }): any {
  const caches: any[] = []

  const _deepClear = (_object: { [key: string]: any }) => {
    if (Object.prototype.toString.call(_object).slice(8, -1).toLowerCase() !== "object")
      return object

    let index = caches.length

    while (index--) {
      if (_object === caches[index]) {
        return _object
      }
    }

    caches.push(_object)

    for (const key in _object) {
      if (_object[key] === null || _object[key] === undefined || _object[key] === "") {
        delete _object[key]
        continue
      }

      _deepClear(_object[key])
    }

    return _object
  }

  return _deepClear(object)
}

export function getFirstValidNode(nodes: VNode | VNode[], maxdeep = 3): VNode | undefined {
  if (maxdeep < 0) return

  if (!(nodes instanceof Array)) {
    nodes = [nodes]
  }

  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i]
    if (item.type === Comment) continue
    if (item.type === Fragment || item.type === "template") {
      const target = getFirstValidNode(item.children as VNode[], maxdeep - 1)
      if (target) return target
    }

    return item
  }
}

export function arrayPatch(oldValue: any[], newValue: any[]) {
  const equalFun = (value1: any, value2: any) => value1 === value2

  let oldStartIndex = 0
  let oldEndIndex = oldValue.length - 1
  let oldStartItem = oldValue[0]
  let oldEndItem = oldValue[oldStartIndex]

  let newStartIndex = 0
  let newEndIndex = newValue.length - 1
  let newStartItem = newValue[0]
  let newEndItem = newValue[newStartIndex]

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (equalFun(oldStartItem, newStartItem)) {
      oldStartItem = oldValue[++oldStartIndex]
      newStartItem = newValue[++newStartIndex]
    } else if (equalFun(oldEndItem, newEndItem)) {
      oldEndItem = oldValue[--oldEndIndex]
      newEndItem = newValue[--newEndIndex]
    } else if (equalFun(oldStartItem, newEndItem)) {
      oldValue.splice(oldEndIndex + 1, 0, newEndItem)
      oldValue.splice(oldStartIndex, 1)
      oldStartItem = oldValue[oldStartIndex]
      oldEndItem = oldValue[--oldEndIndex]
      newEndItem = newValue[--newEndIndex]
    } else if (equalFun(oldEndItem, newStartItem)) {
      oldValue.splice(oldEndIndex, 1)
      oldValue.splice(oldStartIndex, 0, newStartItem)
      oldStartItem = oldValue[++oldStartIndex]
      oldEndItem = oldValue[oldEndIndex]
      newStartItem = newValue[++newStartIndex]
    } else {
      oldValue.splice(oldStartIndex, 0, newStartItem)
      oldStartItem = oldValue[++oldStartIndex]
      oldEndItem = oldValue[++oldEndIndex]
      newStartItem = newValue[++newStartIndex]
    }
  }

  if (oldStartIndex <= oldEndIndex) {
    oldValue.splice(oldStartIndex, oldEndIndex - oldStartIndex + 1)
  }

  while (newStartIndex <= newEndIndex) {
    oldValue.splice(oldStartIndex, 0, newValue[newStartIndex++])
  }

  return oldValue
}

export function createRange<T = any>(start: number, end: number, cb?: (item: number) => T): T[] {
  const range: T[] = []
  for (let i = start; i <= end; i++) {
    range.push(cb ? cb(i) : (i as T))
  }

  return range
}

export function debounce(
  fn: (...rest: any[]) => any,
  duration: number,
  ctx?: (...rest: any[]) => any
) {
  let timeout: any

  return function (this: any, ...rest: any[]) {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(ctx || this, rest)
      timeout = null
    }, duration)
  }
}

export function equal(target: any, origin: any): boolean {
  if (target === origin) return true

  const targetType = Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
  const originType = Object.prototype.toString.call(origin).slice(8, -1).toLowerCase()
  if (targetType !== originType) return false

  const commonType = targetType
  if (commonType === "array") {
    let index = target.length
    if (index !== origin.length) return false

    while (index--) {
      if (!equal(target[index], origin[index])) return false
    }

    return true
  } else if (commonType === "object") {
    const keys: { [x: string]: number } = {}

    for (const key in target) {
      if (!equal(target[key], origin[key])) return false
      keys[key] = 1
    }

    for (const key in origin) {
      if (keys[key] === undefined) return false
    }

    return true
  } else {
    return target.toString() === origin.toString()
  }
}

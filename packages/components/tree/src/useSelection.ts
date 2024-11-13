import { debounce } from "../../../share/helper"

export interface TreeSelection {
  add: (node: any) => void
  remove: (node: any) => void
  clear: () => void
  getSelections: (cb?: (value: any) => any) => any[]
  addListener: (node: any, fn: () => void) => void
  removeListener: (node: any) => void
  isSelectedNode: (node: any) => boolean
  getChildrenSelectedState: (children: any[]) => -1 | 0 | 1
  destory: () => void
}

export function useSelection(): TreeSelection {
  let selections: any[] | null = []
  let listeners: Map<any, any> | null = new Map()

  const _dispatch = debounce(() => {
    listeners?.forEach(fn => fn())
  }, 0)

  function add(node: any) {
    if (!isSelectedNode(node)) {
      selections?.push(node)
    }
    _dispatch()
  }

  function remove(node: any) {
    const index = getNodeIndex(node)
    if (index > -1) {
      selections?.splice(index, 1)
    }
    _dispatch()
  }

  function clear() {
    selections = []
  }

  function getSelections(cb?: (value: any) => any) {
    const res: any[] = []
    selections?.forEach(item => {
      res.push(cb ? cb(item) : item)
    })
    return res
  }

  function addListener(node: any, fn: () => void) {
    listeners?.set(node, fn)
  }

  function removeListener(node: any) {
    listeners?.delete(node)
  }

  function getNodeIndex(node: any) {
    return selections ? selections.findIndex(item => item.value === node.value) : -1
  }

  function isSelectedNode(node: any) {
    return getNodeIndex(node) > -1
  }

  function getChildrenSelectedState(children: any[]) {
    let res: -1 | 0 | 1 = -1

    const count = children.reduce((acc, cur) => {
      return acc + (isSelectedNode(cur) ? 1 : 0)
    }, 0)

    if (count > 0 && count < children.length) {
      res = 0
    } else if (count === children.length) {
      res = 1
    }

    return res
  }

  function destory() {
    selections = null
    listeners?.clear()
    listeners = null
  }

  return {
    add,
    remove,
    clear,
    getSelections,
    addListener,
    removeListener,
    isSelectedNode,
    getChildrenSelectedState,
    destory
  }
}

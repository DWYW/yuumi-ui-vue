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
  let selections: Set<any> | null = new Set()
  let listeners: Map<any, any> | null = new Map()

  const _dispatch = debounce(() => {
    listeners?.forEach(fn => fn())
  }, 0)

  function add(node: any) {
    selections?.add(node)
    _dispatch()
  }

  function remove(node: any) {
    selections?.delete(node)
    _dispatch()
  }

  function clear() {
    selections?.clear()
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

  function isSelectedNode(node: any) {
    return selections ? selections.has(node) : false
  }

  function getChildrenSelectedState(children: any[]) {
    let res: -1 | 0 | 1 = -1

    for (let i = 0; i < children.length; i++) {
      if (selections?.has(children[i])) {
        if (res === -1 && i !== 0) {
          res = 0
          break
        }
        res = 1
      } else if (res === 1) {
        res = 0
        break
      }
    }

    return res
  }

  function destory() {
    selections?.clear()
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

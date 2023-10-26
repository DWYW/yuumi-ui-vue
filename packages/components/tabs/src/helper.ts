import { getValueByPath } from '../../../share/helper'
import type { Slot, VNode } from 'vue'

export function getTabItemsFromSlot (childName: string, slot?: Slot) {
  const res: VNode[] = []

  function walker (vnodes: VNode[]) {
    vnodes.forEach((vnode) => {
       // v-if v-for 'Symbol(v-fgt)'
       const targets = ['Symbol(Fragment)',  'Symbol()', 'Symbol(v-fgt)']
       if (targets.includes(vnode.type.toString())) {
        walker(vnode.children as VNode[] || [])
        return
      }

      if (getValueByPath(vnode, 'type.name') !== childName) return
      res.push(vnode)
    })
  }

  walker(slot ? slot() : [])
  return res
}
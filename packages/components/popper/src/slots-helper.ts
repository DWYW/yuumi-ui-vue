import { VNode, createVNode, getCurrentInstance } from 'vue'
import { getFirstValidNode } from '../../../share/helper'

export function useSlotsHelper() {
  const instance = getCurrentInstance()!

  function getTriggerNode() {
    const { trigger: triggerSlots } = instance.slots
    if (!triggerSlots) return createVNode('span')

    const node = getFirstValidNode(triggerSlots())

    if (node && node.type === Text) {
      return createVNode('span', {}, [node])
    }

    return node as VNode
  }

  return {
    getTriggerNode
  }
}
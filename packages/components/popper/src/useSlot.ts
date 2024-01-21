import { createVNode, useSlots } from "vue"
import { getFirstValidNode } from "../../../share/helper"

export function useSlot() {
  const slots = useSlots()

  function createTriggerNode() {
    const vnodes = slots.trigger ? slots.trigger() : []
    const node = getFirstValidNode(vnodes)

    if (node && node.type === Text) {
      return createVNode("span", {}, [node])
    }

    return node ? node : createVNode("span")
  }

  function createPopperNode() {
    return slots.default ? slots.default() : undefined
  }

  return {
    createTriggerNode,
    createPopperNode
  }
}

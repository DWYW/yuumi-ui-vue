import { isValidStepDirection } from "./validator"
import { getValueByPath } from "./helper"
import type { VNode } from "vue"

export * from "./use-key"
export * from "./use-namespace"
export * from "./use-placement"
export * from "./use-size"
export * from "./use-step"
export * from "./use-theme"
export * from "./use-type"

export function useStepDirection() {
  return {
    type: String,
    validator: isValidStepDirection,
    default: "horizontal"
  }
}

export function useChildrenVNode(vnodes: any[], name: string): VNode[] {
  let res: VNode[] = []
  vnodes.forEach(item => {
    if (getValueByPath(item, "type.name") === name) {
      res.push(item)
    }

    if (item.children instanceof Array) {
      res = res.concat(useChildrenVNode(item.children, name))
    }
  })
  return res
}

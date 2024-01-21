import { computed } from "vue"
import { TreeProps } from "./props"
import { getValueByPath } from "../../../share/helper"
import type { ComputedRef } from "vue"

const DEFAULT_KEY = {
  label: "label",
  value: "value",
  children: "children",
  disabled: "disabled",
  checked: "checked",
  expand: "expand"
}

export interface NodeHelper {
  keys: ComputedRef<Record<string, string>>
  getAttrValue: <T>(node: any, attr: keyof typeof DEFAULT_KEY, fallback?: T) => T
}

export function useNodeHelper(props: ComputedRef<TreeProps>): NodeHelper {
  const keys = computed(() => Object.assign(DEFAULT_KEY, props.value.optionKey))

  function getAttrValue<T>(node: any, attr: keyof typeof DEFAULT_KEY, fallback?: T): T {
    return getValueByPath<T>(node, keys.value[attr], fallback)
  }

  return {
    keys,
    getAttrValue
  }
}

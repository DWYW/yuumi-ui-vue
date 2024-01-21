import { getValueByPath } from "../../../share/helper"
import { computed } from "vue"
import type { ComputedRef } from "vue"
import type { CascaderProps } from "./props"

export function useHelper(props: ComputedRef<CascaderProps>) {
  const optionKey = computed(() => {
    return Object.assign(
      {
        label: "label",
        value: "value",
        disabled: "disabled",
        children: "children"
      },
      props.value.optionKey
    )
  })

  function getLabel(option: any) {
    return getValueByPath<string>(option, optionKey.value.label, "")
  }

  function getValue(option: any) {
    return getValueByPath(option, optionKey.value.value, "")
  }

  function getDisabled(option: any) {
    return getValueByPath<boolean>(option, optionKey.value.disabled, false)
  }

  function getChildren(option: any) {
    return getValueByPath<any[]>(option, optionKey.value.children, [])
  }

  function isLeafNode(option: any) {
    return getValueByPath<any[]>(option, optionKey.value.children, []).length === 0
  }

  return {
    getLabel,
    getValue,
    getDisabled,
    getChildren,
    isLeafNode
  }
}

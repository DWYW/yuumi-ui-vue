import { getValueByPath } from "../../../share/helper"
import type { ComputedRef } from "vue"
import type { SelectProps } from "./props"

export function useHelper(props: ComputedRef<SelectProps>) {
  function getLabel(option: any) {
    return getValueByPath(option, props.value.optionKey.label, "")
  }

  function getValue(option: any) {
    return getValueByPath(option, props.value.optionKey.value, "")
  }

  return {
    getLabel,
    getValue
  }
}

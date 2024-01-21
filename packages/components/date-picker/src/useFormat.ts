import { ComputedRef, computed } from "vue"
import { DatePickerProps } from "./props"

export interface DatePickerFormat {
  format: ComputedRef<string>
  timeFormat: ComputedRef<string>
  dateFormat: ComputedRef<string>
}

export function useFormat(props: ComputedRef<DatePickerProps>) {
  const format = computed(() => {
    if (props.value.format) return props.value.format
    return /time/.test(props.value.type) ? "YYYY-MM-DD hh:mm:ss" : "YYYY-MM-DD"
  })

  const timeFormat = computed(() => {
    const rules = ["hh", "mm", "ss"]
    if (!props.value.format) return rules.join(":")
    return (props.value.format.match(/h+|m+|s+/g) || rules).join(":")
  })

  const dateFormat = computed(() => {
    const rules = ["YYYY", "MM", "DD"]
    if (!props.value.format) return rules.join("-")
    return (props.value.format.match(/Y+|M+|D+/g) || rules).join("-")
  })

  return {
    format,
    timeFormat,
    dateFormat
  }
}

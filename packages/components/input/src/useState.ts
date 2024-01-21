import { computed, useSlots } from "vue"
import { isDefined } from "../../../share/validator"
import type { ComputedRef } from "vue"
import type { InputProps } from "./props"

export function useState(props: ComputedRef<InputProps>) {
  const slots = useSlots()
  const hasPrefixIcon = computed(() => {
    return isDefined(props.value.prefixIcon) && !isDefined(slots.prefix)
  })
  const hasPrefix = computed(() => {
    return isDefined(slots.prefix)
  })
  const hasSuffixIcon = computed(() => {
    return isDefined(props.value.suffixIcon) && !isDefined(slots.suffix)
  })
  const hasSuffix = computed(() => {
    return isDefined(slots.suffix)
  })

  return {
    hasPrefixIcon,
    hasPrefix,
    hasSuffixIcon,
    hasSuffix
  }
}

import { computed, ref } from "vue"
import type { ComputedRef, SetupContext } from "vue"
import type { InputProps } from "./props"
import type { InputEmits } from "./emits"

export function useClearable(
  props: ComputedRef<InputProps>,
  emit: SetupContext<InputEmits>["emit"]
) {
  const isEntered = ref(false)
  const isCanClear = computed(() => {
    return props.value.clearable && props.value.modelValue !== "" && isEntered.value
  })

  function mouseenterHandler() {
    if (props.value.readonly || props.value.disabled) return
    isEntered.value = true
  }

  function mouseleaveHandler() {
    if (props.value.readonly || props.value.disabled) return
    isEntered.value = false
  }

  function hanlderClear() {
    emit("update:modelValue", "")
    emit("clear")
  }

  return {
    isCanClear,
    hanlderClear,
    mouseenterHandler,
    mouseleaveHandler
  }
}

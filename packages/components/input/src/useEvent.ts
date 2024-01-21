import { ref } from "vue"
import type { ComputedRef, SetupContext } from "vue"
import type { InputProps } from "./props"
import type { InputEmits } from "./emits"

export function useEvent(props: ComputedRef<InputProps>, emit: SetupContext<InputEmits>["emit"]) {
  const isFocus = ref(false)

  const isCompositing = ref(false)

  function compositionstartHandler(e: Event) {
    isCompositing.value = true
    emit("compositionstart", e)
  }

  function compositionendHandler(e: Event) {
    isCompositing.value = false
    emit("compositionend", e)
    inputHandler(e)
  }

  function valueIsValid(value: string) {
    const limit = props.value.limit ? props.value.limit : props.value.trim ? /^\S*$/ : undefined
    if (!value || !limit || isCompositing.value) return true

    return (
      (typeof limit === "function" && limit(value)) ||
      (limit instanceof RegExp && limit.test(value))
    )
  }

  function inputHandler(e: Event) {
    const target = e.target as HTMLInputElement
    if (!valueIsValid(target.value)) {
      target.value = props.value.modelValue || ""
    }

    if (!isCompositing.value) {
      emit("update:modelValue", target.value)
      emit("input", e)
    }
  }

  function focusHandler(e: Event) {
    isFocus.value = true
    emit("focus", e)
  }

  function blurHandler(e: Event) {
    isFocus.value = false
    emit("blur", e)
  }

  return {
    isFocus,
    compositionstartHandler,
    compositionendHandler,
    valueIsValid,
    inputHandler,
    focusHandler,
    blurHandler
  }
}

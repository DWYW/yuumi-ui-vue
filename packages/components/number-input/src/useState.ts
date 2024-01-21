import { computed, ref } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { NumberInputProps } from "./props"

export function useState(props: ComputedRef<NumberInputProps>, currentValue: Ref<number>) {
  const decreaseDisabled = computed(() => {
    return props.value.disabled || currentValue.value < props.value.min + 1
  })
  const increaseDisabled = computed(() => {
    return props.value.disabled || currentValue.value > props.value.max - 1
  })

  const isFocus = ref(false)

  function updateFocusState(value: boolean) {
    isFocus.value = value
  }

  function onMouseenter(type: 1 | -1) {
    if (props.value.disabled) return
    if (type === -1 && decreaseDisabled.value) return
    if (type === 1 && increaseDisabled.value) return

    updateFocusState(true)
  }

  function onMouseleave() {
    if (!isFocus.value) return
    updateFocusState(false)
  }

  return {
    decreaseDisabled,
    increaseDisabled,
    isFocus,
    updateFocusState,
    onMouseenter,
    onMouseleave
  }
}

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
  const isHover = ref(false)

  function updateFocusState(value: boolean) {
    isFocus.value = value
  }

  function onMouseenter(type: 1 | -1) {
    if (props.value.disabled) return
    if (type === -1 && decreaseDisabled.value) return
    if (type === 1 && increaseDisabled.value) return

    isHover.value = true
  }

  function onMouseleave() {
    if (!isHover.value) return
    isHover.value = false
  }

  return {
    decreaseDisabled,
    increaseDisabled,
    isFocus,
    isHover,
    updateFocusState,
    onMouseenter,
    onMouseleave
  }
}

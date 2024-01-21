import type { ComputedRef, Ref } from "vue"
import type { SliderProps } from "./props"

export function useTooltip(props: ComputedRef<SliderProps>, poppers: Ref<any[]>) {
  function showPopper(index: number) {
    if (!props.value.showTooltip) return
    const popper = poppers.value[index]
    if (popper) popper.showPopper()
  }

  function updatePopper(index: number) {
    if (!props.value.showTooltip) return
    const popper = poppers.value[index]
    if (popper && popper.popper) popper.popper.update()
  }

  function hidePopper(index: number) {
    if (!props.value.showTooltip) return
    const popper = poppers.value[index]
    if (popper) popper.hidePopper()
  }

  return {
    showPopper,
    updatePopper,
    hidePopper
  }
}

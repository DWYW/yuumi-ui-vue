import { computed, ref } from "vue"
import type { ComputedRef } from "vue"
import type { DatePickerProps } from "./props"

export interface DatePickerState {
  isFocus: boolean
  isCanClear: boolean
  isRange: boolean
  hasTime: boolean
}

export function useState(props: ComputedRef<DatePickerProps>) {
  const isFocus = ref(false)
  const isCanClear = ref(false)

  const state = computed<DatePickerState>(() => {
    return {
      isFocus: isFocus.value,
      isCanClear: isCanClear.value,
      isRange: /range/.test(props.value.type),
      hasTime: /time/.test(props.value.type)
    }
  })

  function updateState(key: keyof DatePickerState, value: boolean) {
    const setters: {
      [x in keyof DatePickerState]?: (value: boolean) => void
    } = {
      isFocus: (value: boolean) => {
        isFocus.value = value
      },
      isCanClear: (value: boolean) => {
        isCanClear.value = value
      }
    }

    if (typeof setters[key] === "function") {
      setters[key]!(value)
    }
  }

  return {
    state: state,
    updateState
  }
}

import { computed, ref } from "vue"

export interface TimePickerState {
  isFocus: boolean
  isCanClear: boolean
}

export function useState() {
  const isFocus = ref(false)
  const isCanClear = ref(false)

  const state = computed<TimePickerState>(() => {
    return {
      isFocus: isFocus.value,
      isCanClear: isCanClear.value
    }
  })

  function updateState(key: keyof TimePickerState, value: boolean) {
    const setters: {
      [x in keyof TimePickerState]?: (value: boolean) => void
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

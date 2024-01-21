import { computed, ref } from "vue"

export interface CascaderState {
  isFocus: boolean
  isLoading: boolean
  isCanClear: boolean
}

export function useState() {
  const isFocus = ref(false)
  const isCanClear = ref(false)
  const isLoading = ref(false)

  const state = computed<CascaderState>(() => {
    return {
      isFocus: isFocus.value,
      isLoading: isLoading.value,
      isCanClear: isCanClear.value
    }
  })

  function updateState(key: keyof CascaderState, value: boolean) {
    const setters: {
      [x in keyof CascaderState]?: (value: boolean) => void
    } = {
      isFocus: (value: boolean) => {
        isFocus.value = value
      },
      isCanClear: (value: boolean) => {
        isCanClear.value = value
      },
      isLoading: (value: boolean) => {
        isLoading.value = value
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

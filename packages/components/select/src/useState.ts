import { computed, ref } from "vue"

export interface SelectState {
  isFocus: boolean
  isCanClear: boolean
  isLoading: boolean
  isLoadingRemoteData: boolean
}

export function useState() {
  const isFocus = ref(false)
  const isCanClear = ref(false)
  const isLoading = ref(false)
  const isLoadingRemoteData = ref(false)

  const state = computed<SelectState>(() => {
    return {
      isFocus: isFocus.value,
      isLoading: isLoading.value,
      isCanClear: isCanClear.value,
      isLoadingRemoteData: isLoadingRemoteData.value
    }
  })

  function updateState(key: keyof SelectState, value: boolean) {
    const setters: {
      [x in keyof SelectState]?: (value: boolean) => void
    } = {
      isFocus: (value: boolean) => {
        isFocus.value = value
      },
      isCanClear: (value: boolean) => {
        isCanClear.value = value
      },
      isLoading: (value: boolean) => {
        isLoading.value = value
      },
      isLoadingRemoteData: (value: boolean) => {
        isLoadingRemoteData.value = value
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

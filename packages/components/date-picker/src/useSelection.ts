import { ref } from "vue"
import type { Ref } from "vue"

export interface DatePickerSelection {
  startValue: Ref<Date | undefined>
  endValue: Ref<Date | undefined>
  updateSelected: (value: Date, isEnd?: boolean) => void
  save: () => void
  restore: () => void
  clear: () => void
}

export function useSelection(): DatePickerSelection {
  const startValue = ref<Date>()
  const endValue = ref<Date>()

  function updateSelected(value: Date, isEnd?: boolean) {
    if (isEnd && String(endValue.value) !== String(value)) {
      endValue.value = value
    } else if (!isEnd && String(startValue.value) !== String(value)) {
      startValue.value = value
    }
  }

  let saveStartValue = ""
  let saveEndValue = ""

  function save() {
    saveStartValue = String(startValue.value)
    saveEndValue = String(endValue.value)
  }

  function restore() {
    let start: Date | undefined = new Date(saveStartValue)
    if (String(start) === "Invalid Date") {
      start = void 0
    }
    startValue.value = start

    let end: Date | undefined = new Date(saveEndValue)
    if (String(end) === "Invalid Date") {
      end = void 0
    }
    endValue.value = end
  }

  function clear() {
    startValue.value = void 0
    endValue.value = void 0
  }

  return {
    startValue,
    endValue,
    updateSelected,
    save,
    restore,
    clear
  }
}

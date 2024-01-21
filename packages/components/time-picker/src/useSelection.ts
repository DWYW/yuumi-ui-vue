import { ref } from "vue"
import type { Ref } from "vue"

export interface TimePickerSelection {
  startValue: Ref<number[]>
  endValue: Ref<number[]>
  valueStringfy: (value: number[], format: string) => string
  itemSelected: (index: number, value: number, isEnd?: boolean) => void
}

export function useSelection() {
  const startValue = ref<number[]>([])
  const endValue = ref<number[]>([])

  function valueStringfy(value: number[], format: string): string {
    if (value.length === 0) return ""
    const rules = [
      [/h{2,}/, `0${value[0]}`.slice(-2)],
      [/h/, value[0]],
      [/m{2,}/, `0${value[1]}`.slice(-2)],
      [/m/, value[1]],
      [/s{2,}/, `0${value[2]}`.slice(-2)],
      [/s/, value[2]]
    ]

    return rules
      .reduce((str, [reg, item]: any) => {
        return (str = str.replace(reg, item))
      }, format)
      .replace(/[h,s,m]+/g, "")
  }

  function itemSelected(index: number, value: number, isEnd?: boolean) {
    if (isEnd && endValue.value[index] !== value) {
      endValue.value[index] = value
    } else if (!isEnd && startValue.value[index] !== value) {
      startValue.value[index] = value
    }
  }

  let saveStartValue = ""
  let saveEndValue = ""
  function save() {
    saveStartValue = JSON.stringify(startValue.value)
    saveEndValue = JSON.stringify(endValue.value)
  }

  function restore() {
    startValue.value = JSON.parse(saveStartValue)
    endValue.value = JSON.parse(saveEndValue)
  }

  function clear() {
    startValue.value = []
    endValue.value = []
  }

  return {
    startValue,
    endValue,
    valueStringfy,
    itemSelected,
    save,
    restore,
    clear
  }
}

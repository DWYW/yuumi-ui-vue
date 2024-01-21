import { equal } from "../../../share/helper"
import { computed, ref } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { TableProps } from "./props"

export interface TableSelection {
  selections: Ref<any[]>
  selectionValue: ComputedRef<number>
  selectionChanged: (...rest: any[]) => any
  toggleRowsSelection: (...rest: any[]) => any
  clearSelection: (...rest: any[]) => any
}

export function useSelection(props: ComputedRef<TableProps>, emit: (...rest: any[]) => any) {
  const selections: Ref<any[]> = ref([])

  // -1:unchecked  0:partChecked  1: allChecked
  const selectionValue: ComputedRef<-1 | 0 | 1> = computed(() => {
    const _data = props.value.data
    const _selections = selections.value
    if (_selections.length === 0 || !_data || _data.length === 0) return -1

    if (_data.every((item: any) => _selections.some(selection => equal(selection, item)))) {
      return 1
    }

    if (_data.some((item: any) => _selections.some(selection => equal(selection, item)))) {
      return 0
    }

    return -1
  })

  function selectionChanged({ value, checked }: any) {
    const _data = props.value.data
    if (value === -1) {
      toggleRowsSelection(_data, checked)
      emit("selectAll", selections.value)
    } else {
      emit("select", {
        selections: selections.value,
        row: _data[value]
      })

      toggleRowsSelection([_data[value]], checked)
    }
  }

  function toggleRowsSelection(rows: any[], value: boolean) {
    rows.forEach(row => {
      const index = selections.value.findIndex(item => equal(item, row))
      let selectionChange = false

      if (value && index === -1) {
        selections.value.push(row)
        selectionChange = true
      } else if (!value && index > -1) {
        selections.value.splice(index, 1)
        selectionChange = true
      }

      if (selectionChange) {
        emit("selectionChange", selections.value)
      }
    })
  }

  function clearSelection() {
    selections.value = []
  }

  return {
    selections,
    selectionValue,
    selectionChanged,
    toggleRowsSelection,
    clearSelection
  }
}

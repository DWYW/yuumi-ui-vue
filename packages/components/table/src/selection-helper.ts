import { equal } from '../../../share/helper'
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'

export interface TableSelection {
  selections: Ref<any[]>
  selectionValue: ComputedRef<number>,
  selectionChanged: (...rest: any[]) => any
  toggleRowsSelection: (...rest: any[]) => any
  clearSelection: (...rest: any[]) => any
}

export function useSelection (props: {[x: string]: any}, emit: (...rest: any[]) => any) {
  const selections: Ref<any[]> = ref([])

  // -1:unchecked  0:partChecked  1: allChecked
  const selectionValue: ComputedRef<-1|0|1> = computed(() => {
    if (selections.value.length === 0 || !props.data || props.data.length === 0) return -1

    if (props.data.every((item: any) => selections.value.some(selection => equal(selection, item)))) {
      return 1
    }

    if (props.data.some((item: any) => selections.value.some(selection => equal(selection, item)))) {
      return 0
    }

    return -1
  })

  function selectionChanged ({ value, checked }: any) {
    if (value === -1) {
      toggleRowsSelection(props.data, checked)
      emit('selectAll', selections.value)
    } else {
      emit('select', {
        selections: selections.value,
        row: props.data[value]
      })

      toggleRowsSelection([props.data[value]], checked)
    }
  }

  function toggleRowsSelection (rows: any[], value: boolean) {
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
        emit('selectionChange', selections.value)
      }
    })
  }

  function clearSelection () {
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
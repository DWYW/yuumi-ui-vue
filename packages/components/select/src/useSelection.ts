import { ref } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { SelectProps } from "./props"

export interface SelectionItem {
  label: string
  value: string
}

export interface SelectSelection {
  selections: Ref<SelectionItem[]>
  selectionAddItem: (option: SelectionItem) => void
  selectionDeleteItem: (option: SelectionItem) => void
  clearSelections: () => void
}

export function useSelection(props: ComputedRef<SelectProps>): SelectSelection {
  const selections: Ref<SelectionItem[]> = ref([])

  function selectionAddItem(option: SelectionItem) {
    if (!props.value.multiple) {
      selections.value = [option]
    }

    const target = selections.value.find(item => item.value === option.value)
    if (!target) {
      selections.value.push(option)
    }
  }

  function selectionDeleteItem(option: SelectionItem) {
    const index = selections.value.findIndex(item => item.value === option.value)
    if (index >= 0) {
      selections.value.splice(index, 1)
    }
  }

  function clearSelections() {
    selections.value = []
  }

  return {
    selections,
    selectionAddItem,
    selectionDeleteItem,
    clearSelections
  }
}

import { computed, ref } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { CascaderProps } from "./props"

export interface SelectionItem {
  label: string
  value: string
}

export interface CascaderSelection {
  selections: Ref<SelectionItem[]>
  selectionsText: ComputedRef<string>
  clearSelections: () => void
}

export function useSelection(props: ComputedRef<CascaderProps>): CascaderSelection {
  const selections: Ref<SelectionItem[]> = ref([])

  const selectionsText = computed(() => {
    if (typeof props.value.labelFormat === "function") {
      return props.value.labelFormat(selections.value)
    }

    return selections.value.map(item => item.label).join(props.value.hyphen)
  })

  function clearSelections() {
    selections.value = []
  }

  return {
    selections,
    selectionsText,
    clearSelections
  }
}

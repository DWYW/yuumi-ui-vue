import { computed, Ref } from 'vue'

export const LOAD_STATUS = {
  DEFAULT: 0,
  LOADED: 1,
  FAILED: 2,
  LOADING: 3
}

export interface UseChildrenOption {
  children: Ref<any[]>
  loadStatus: Ref<number>
}

export default function useChildren({ children, loadStatus }: UseChildrenOption, loader?: (proxy: any) => Promise<any>) {
  const isLeaf = computed(() => {
    if (loader) {
      if (loadStatus.value === LOAD_STATUS.DEFAULT) return false
      if (loadStatus.value === LOAD_STATUS.LOADING) return false
    }

    return children.value.length === 0
  })

  return {
    isLeaf
  }
}
import { computed, ref } from "vue"
import type { ComputedRef, Ref } from "vue"

export interface ScrollState {
  verticalBarWidth: Ref<number>
  horizontalBarHeight: Ref<number>
  isScrollStart: Ref<boolean>
  isScrollEnd: Ref<boolean>
  isScrollX: ComputedRef<boolean>
  isScrollY: ComputedRef<boolean>
  reset: (element: HTMLElement) => void
  update: (element: HTMLElement) => void
}

export function useScrollState() {
  const verticalBarWidth = ref(0)
  const horizontalBarHeight = ref(0)
  const isScrollStart = ref(false)
  const isScrollEnd = ref(false)
  const isScrollX = computed(() => horizontalBarHeight.value > 0)
  const isScrollY = computed(() => verticalBarWidth.value > 0)

  function reset(element: HTMLElement) {
    if (!element) return
    // fix: 数值不为整数显示问题
    // 使用 getBoundingClientRect 代替 offsetWidth/offsetHeight
    const rect = element.getBoundingClientRect()
    verticalBarWidth.value = rect.width - element.clientWidth
    horizontalBarHeight.value = rect.height - element.clientHeight
    update(element)
  }

  function update(element: HTMLElement) {
    isScrollStart.value = element.scrollLeft === 0
    isScrollEnd.value = element.scrollLeft + element.clientWidth === element.scrollWidth
  }

  return {
    verticalBarWidth,
    horizontalBarHeight,
    isScrollStart,
    isScrollEnd,
    isScrollX,
    isScrollY,
    reset,
    update
  }
}

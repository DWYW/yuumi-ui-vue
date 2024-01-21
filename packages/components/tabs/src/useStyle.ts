import { computed, ref } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { TabsProps } from "./props"

export function useStyle(props: ComputedRef<TabsProps>, refs: { [x: string]: Ref<HTMLElement> }) {
  const isVertical = computed(() => /left|right/.test(props.value.position))

  const rectStyle = ref<Record<string, string>>({})
  function updateRectPosition() {
    const element = refs.navsBody.value.querySelector<HTMLElement>("._selected")
    if (!element) return

    const parentRect = element.parentElement!.getBoundingClientRect()

    if (isVertical.value) {
      const { top, height } = element.getBoundingClientRect()
      rectStyle.value = {
        transform: `translateY(${top - parentRect.top}px)`,
        height: `${height}px`
      }
    } else {
      const { left, width } = element.getBoundingClientRect()
      rectStyle.value = {
        transform: `translateX(${left - parentRect.left}px)`,
        width: `${width}px`
      }
    }
  }

  const hasScrollbar = ref(false)
  function updateScollbarState() {
    const element = refs.navsBody.value
    const parentElement = element.parentElement as HTMLElement
    if (isVertical.value) {
      hasScrollbar.value = parentElement.clientHeight < element.clientHeight
    } else {
      hasScrollbar.value = parentElement.clientWidth < element.clientWidth
    }
  }

  const positionTop = ref(0)
  const positionLeft = ref(0)
  const navsStyle = computed(() => {
    return {
      transform: isVertical.value
        ? `translateY(${0 - positionTop.value}px)`
        : `translateX(${0 - positionLeft.value}px)`
    }
  })
  function updateNavsPosition(factor: -1 | 0 | 1) {
    const bodyRect = refs.navsBody.value.getBoundingClientRect()
    const parentRect = refs.navsBody.value.parentElement!.getBoundingClientRect()

    if (isVertical.value) {
      let top = positionTop.value + factor * parentRect.height * 0.9

      if (factor > 0) {
        positionTop.value = Math.min(top, bodyRect.height - parentRect.height)
      } else if (factor < 0) {
        positionTop.value = Math.max(top, 0)
      } else {
        const element = refs.navsBody.value.querySelector("._selected")
        if (element) {
          const rect = element.getBoundingClientRect()
          top =
            positionTop.value + rect.top - parentRect.top - (parentRect.height - rect.height) / 2
        }

        positionTop.value = Math.max(0, Math.min(top, bodyRect.height - parentRect.height))
      }
    } else {
      let left = positionLeft.value + factor * parentRect.width * 0.9

      if (factor > 0) {
        positionLeft.value = Math.min(left, bodyRect.width - parentRect.width)
      } else if (factor < 0) {
        positionLeft.value = Math.max(left, 0)
      } else {
        const element = refs.navsBody.value.querySelector("._selected") as HTMLElement
        if (element) {
          const rect = element.getBoundingClientRect()
          left =
            positionLeft.value + rect.left - parentRect.left - (parentRect.width - rect.width) / 2
        }
        positionLeft.value = Math.max(0, Math.min(left, bodyRect.width - parentRect.width))
      }
    }
  }

  return {
    isVertical,
    rectStyle,
    updateRectPosition,
    hasScrollbar,
    updateScollbarState,
    navsStyle,
    updateNavsPosition
  }
}

import type { ComputedRef, Ref } from "vue"
import type { ScrollbarProps } from "./props"

interface Cache {
  x?: number
  y?: number
  top?: number
  left?: number
  target?: HTMLElement
}

export function useEvent(
  props: ComputedRef<ScrollbarProps>,
  refs: {
    el: Ref<HTMLElement | undefined>
    body: Ref<HTMLElement | undefined>
    horizontal: Ref<HTMLElement | undefined>
    vertical: Ref<HTMLElement | undefined>
  }
) {
  let cache: Cache = {}

  function hanlderMousedown(e: MouseEvent) {
    if (!refs.el.value) return
    const { pageX, pageY } = e
    const target = e.target as HTMLElement
    cache.target = target

    if (target.dataset.type === "horizontal") {
      cache.y = pageY
      cache.top = parseInt(target.style.top)
    } else if (target.dataset.type === "vertical") {
      cache.x = pageX
      cache.left = parseInt(target.style.left)
    }

    if (props.value.behavior === "hover") {
      refs.el.value.classList.remove("yuumi-scrollbar--hover")
    }

    window.addEventListener("mousemove", hanlderMousemove, false)
    window.addEventListener("mouseup", hanlderMouseup, false)
  }

  function hanlderMousemove({ pageX, pageY }: MouseEvent) {
    const bodyEl = refs.body.value
    const verticalEl = refs.vertical.value
    const horizontalEl = refs.horizontal.value
    if (!bodyEl || !verticalEl || !horizontalEl) return

    const { scrollWidth, scrollHeight } = bodyEl
    const { x, left, y, top } = cache

    if (x !== undefined && left !== undefined) {
      const { clientWidth, offsetHeight } = bodyEl
      const horizontalWidth = offsetHeight < scrollHeight ? horizontalEl.clientWidth : 0
      const maxAvalidWidth = clientWidth - verticalEl.clientWidth - horizontalWidth
      const _left = Math.max(Math.min(left + pageX - x, maxAvalidWidth), 0)
      bodyEl.scrollLeft =
        ((_left + verticalEl.clientWidth) / (clientWidth - horizontalWidth)) * scrollWidth -
        clientWidth
    } else if (y !== undefined && top !== undefined) {
      const { clientHeight, offsetWidth } = bodyEl
      const verticalHeight = offsetWidth < scrollWidth ? verticalEl.clientHeight : 0
      const maxAvalidHeight = clientHeight - horizontalEl.clientHeight - verticalHeight
      const _top = Math.max(Math.min(top + pageY - y, maxAvalidHeight), 0)
      bodyEl.scrollTop =
        ((_top + horizontalEl.clientHeight) / (clientHeight - verticalHeight)) * scrollHeight -
        clientHeight
    }
  }

  function hanlderMouseup() {
    if (refs.el.value && props.value.behavior === "hover") {
      refs.el.value.classList.add("yuumi-scrollbar--hover")
    }
    cache = {}
    window.removeEventListener("mousemove", hanlderMousemove, false)
    window.removeEventListener("mouseup", hanlderMouseup, false)
  }

  return {
    hanlderMousedown
  }
}

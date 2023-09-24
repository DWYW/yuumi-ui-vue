import { getCurrentInstance } from 'vue'

interface Cache {
  x?: number
  y?: number
  top?: number
  left?: number
  target?: HTMLElement
}

export function useDrag() {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('Must be called at the top of a `setup` function')

  const { proxy } = instance as {[x:string]: any}
  let cache: Cache = {}

  function onDragstart (e: MouseEvent) {
    const { pageX, pageY } = e
    const target = e.target as HTMLElement
    cache.target = target

    if (target.hasAttribute('horizontal')) {
      cache.y = pageY
      cache.top = parseInt(target.style.top)
    } else if (target.hasAttribute('vertical')) {
      cache.x = pageX
      cache.left = parseInt(target.style.left)
    }

    if (proxy.behavior === 'hover') {
      proxy.$el.classList.remove(`behavior_${proxy.behavior}`)
    }

    window.addEventListener('mousemove', onDragmove, false)
    window.addEventListener('mouseup', onDragend, false)
  }

  function onDragmove ({ pageX, pageY}: MouseEvent) {
    const bodyElement = proxy.$refs.body as HTMLElement
    const verticalElement = proxy.$refs.vertical as HTMLElement
    const horizontalElement = proxy.$refs.horizontal as HTMLElement
    const { scrollWidth, scrollHeight } = bodyElement
    const { x, left, y, top } = cache

    if (x !== undefined && left !== undefined) {
      const { clientWidth, offsetHeight } = bodyElement
      const horizontalWidth = offsetHeight < scrollHeight ? horizontalElement.clientWidth : 0
      const maxAvalidWidth = clientWidth - verticalElement.clientWidth - horizontalWidth
      const _left = Math.max(Math.min(left + pageX - x, maxAvalidWidth), 0)
      bodyElement.scrollLeft = (_left + verticalElement.clientWidth) / (clientWidth - horizontalWidth) * scrollWidth - clientWidth
    } else if (y !== undefined && top !== undefined) {
      const { clientHeight, offsetWidth } = bodyElement
      const verticalHeight = offsetWidth < scrollWidth ? verticalElement.clientHeight : 0
      const maxAvalidHeight = clientHeight - horizontalElement.clientHeight - verticalHeight
      const _top = Math.max(Math.min(top + pageY - y, maxAvalidHeight), 0)
      bodyElement.scrollTop = (_top + horizontalElement.clientHeight) / (clientHeight - verticalHeight) * scrollHeight - clientHeight
    }
  }

  function onDragend () {
    if (proxy.behavior === 'hover') {
      proxy.$el.classList.add(`behavior_${proxy.behavior}`)
    }
    cache = {}
    window.removeEventListener('mousemove', onDragmove, false)
    window.removeEventListener('mouseup', onDragend, false)
  }

  return {
    onDragstart,
    onDragmove,
    onDragend
  }
}
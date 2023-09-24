interface EventCache {
  x: number
  y: number
  vertical: number
  horizontal: number
  done: boolean
}

export function  useEvent(onchange: (detail: EventCache) => void) {
  let _cache:EventCache|null = null

  function onMousedown(e: MouseEvent) {
    e.preventDefault()

    _cache = {
      x: e.pageX,
      y: e.pageY,
      vertical: 0,
      horizontal: 0,
      done: false
    }
    window.addEventListener("mousemove", onMousemove, false)
    window.addEventListener("mouseup", onMouseup, false)
    window.addEventListener("mouseleave", onMouseup, false)
  }

  function onMousemove(e: MouseEvent) {
    e.preventDefault()
    if (!_cache) return
    _cache.horizontal = e.pageX - _cache.x
    _cache.vertical = e.pageY - _cache.y
    onchange(_cache)
  }

  function onMouseup() {
    if (!_cache) return
    _cache.done = true
    onchange(_cache)
    window.removeEventListener("mousemove", onMousemove, false)
    window.removeEventListener("mouseup", onMouseup, false)
    window.removeEventListener("mouseleave", onMouseup, false)
    _cache = null
  }

  return {
    onMousedown
  }
}
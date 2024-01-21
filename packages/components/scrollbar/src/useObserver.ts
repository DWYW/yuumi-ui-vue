import type { Ref } from "vue"

export function useObserver(body: Ref<HTMLElement | undefined>, cb: () => void) {
  let observer: ResizeObserver | null = null

  function useResizeObserver() {
    if (!body.value) return
    const children = body.value.children

    let _isRunning = false
    observer = new ResizeObserver(() => {
      if (_isRunning) return
      _isRunning = true
      cb()
      requestAnimationFrame(() => {
        _isRunning = false
      })
    })

    for (let i = 0; i < children.length; i++) {
      observer.observe(children[i])
    }
  }

  function observe() {
    if (ResizeObserver !== undefined) {
      useResizeObserver()
    }
  }

  function disconnect() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  return {
    observe,
    disconnect
  }
}

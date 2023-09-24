import { getCurrentInstance } from 'vue'

const BAR_MIN_SIZE = 20

export function useUpdateStyle() {
  const instance = getCurrentInstance()
  if (!instance) throw new Error('Must be called at the top of a `setup` function')
  const { proxy } = instance as {[x:string]: any}

  function combineStyle (attrs: {[key: string]: string}, style: string|null) {
    style = style || ''

    for (const key in attrs) {
      const value = attrs[key] ? `${key}:${attrs[key]};` : ''
      const reg = RegExp(`${key}.*?;`)
      style = reg.test(style) ? style.replace(reg, value): style + value
    }

    return style
  }

  function updateBodySize() {
    const bodyElement = proxy.$refs.body as HTMLElement
    const { clientWidth, offsetWidth, clientHeight, offsetHeight } = bodyElement
    bodyElement.setAttribute('style', combineStyle({
      width: `calc(100% + ${offsetWidth - clientWidth}px)`,
      height: `calc(100% + ${offsetHeight - clientHeight}px)`
    }, bodyElement.getAttribute('style')))
  }

  function updateHorizontalBarStyle() {
    const scrollBody = proxy.$refs.body
    const horizontalBar = proxy.$refs.horizontal
    const verticalBar = proxy.$refs.vertical

    const { clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollTop } = scrollBody
    const verticalHeight = offsetWidth < scrollWidth ? verticalBar.clientHeight : 0
    const _height = Math.max(BAR_MIN_SIZE, clientHeight / scrollHeight * (clientHeight - verticalHeight))
    const top = (scrollTop + clientHeight) / scrollHeight * (clientHeight - verticalHeight) - _height

    horizontalBar.setAttribute('style', combineStyle({
      height: `${_height}px`,
      top: `${top}px`,
      display: offsetHeight < scrollHeight ? 'block' : 'none'
    }, horizontalBar.getAttribute('style')))
  }

  function updateVerticalBarStyle () {
    const scrollBody = proxy.$refs.body
    const horizontalBar = proxy.$refs.horizontal
    const verticalBar = proxy.$refs.vertical

    const { clientWidth, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollLeft } = scrollBody
    const horizontalWidth = offsetHeight < scrollHeight ? horizontalBar.clientWidth : 0
    const _width = Math.max(BAR_MIN_SIZE, clientWidth / scrollWidth * (clientWidth - horizontalWidth))
    const left = (scrollLeft + clientWidth) / scrollWidth * (clientWidth - horizontalWidth) - _width

    verticalBar.setAttribute('style', combineStyle({
      width: `${_width}px`,
      left: `${left}px`,
      display: offsetWidth < scrollWidth ? 'block' : 'none'
    }, verticalBar.getAttribute('style')))
  }

  let observer: ResizeObserver|null = null
  function useResizeObserver() {
    const children = proxy.$refs.body.children

    let _isRunning = false
    observer = new ResizeObserver(() => {
      if (_isRunning) return
      _isRunning = true

      updateHorizontalBarStyle()
      updateVerticalBarStyle()

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
    updateBodySize,
    updateHorizontalBarStyle,
    updateVerticalBarStyle,
    observe,
    disconnect
  }
}
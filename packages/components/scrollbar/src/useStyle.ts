import type { Ref } from "vue"
const BAR_MIN_SIZE = 20

function combineStyle(attrs: { [key: string]: string }, style: string | null) {
  style = style || ""

  for (const key in attrs) {
    const value = attrs[key] ? `${key}:${attrs[key]};` : ""
    const reg = RegExp(`${key}.*?;`)
    style = reg.test(style) ? style.replace(reg, value) : style + value
  }

  return style
}

export function useStyle(
  body: Ref<HTMLElement | undefined>,
  horizontal: Ref<HTMLElement | undefined>,
  vertical: Ref<HTMLElement | undefined>
) {
  function updateBodySize() {
    if (!body.value) return
    const { clientWidth, offsetWidth, clientHeight, offsetHeight } = body.value
    const _styles = combineStyle(
      {
        width: `calc(100% + ${offsetWidth - clientWidth}px)`,
        height: `calc(100% + ${offsetHeight - clientHeight}px)`
      },
      body.value.getAttribute("style")
    )
    body.value.setAttribute("style", _styles)
  }

  function updateHorizontalBarStyle() {
    const bodyEl = body.value
    const horizontalEl = horizontal.value
    const verticalEl = vertical.value
    if (!bodyEl || !horizontalEl || !verticalEl) return

    const {
      clientHeight: bodyClientHeight,
      offsetWidth: bodyOffsetWidth,
      offsetHeight: bodyOffsetHeight,
      scrollWidth: bodyScrollWidth,
      scrollHeight: bodyScrollHeight,
      scrollTop: bodyScrollTop
    } = bodyEl

    const { clientHeight: verticalClientHeight } = verticalEl

    const verticalHeight = bodyOffsetWidth < bodyScrollWidth ? verticalClientHeight : 0
    const _height = Math.max(
      BAR_MIN_SIZE,
      (bodyClientHeight / bodyScrollHeight) * (bodyClientHeight - verticalHeight)
    )
    const top =
      ((bodyScrollTop + bodyClientHeight) / bodyScrollHeight) *
        (bodyClientHeight - verticalHeight) -
      _height
    const _style = combineStyle(
      {
        height: `${_height}px`,
        top: `${top}px`,
        display: bodyOffsetHeight < bodyScrollHeight ? "block" : "none"
      },
      horizontalEl.getAttribute("style")
    )
    horizontalEl.setAttribute("style", _style)
  }

  function updateVerticalBarStyle() {
    const bodyEl = body.value
    const horizontalEl = horizontal.value
    const verticalEl = vertical.value
    if (!bodyEl || !horizontalEl || !verticalEl) return

    const {
      clientWidth: bodyClientWidth,
      offsetWidth: bodyOffsetWidth,
      offsetHeight: bodyOffsetHeight,
      scrollWidth: bodyScrollWidth,
      scrollHeight: bodyScrollHeight,
      scrollLeft: bodyScrollLeft
    } = bodyEl

    const { clientWidth: horizontalElClientWidth } = horizontalEl

    const horizontalWidth = bodyOffsetHeight < bodyScrollHeight ? horizontalElClientWidth : 0
    const _width = Math.max(
      BAR_MIN_SIZE,
      (bodyClientWidth / bodyScrollWidth) * (bodyClientWidth - horizontalWidth)
    )
    const left =
      ((bodyScrollLeft + bodyClientWidth) / bodyScrollWidth) * (bodyClientWidth - horizontalWidth) -
      _width
    const _style = combineStyle(
      {
        width: `${_width}px`,
        left: `${left}px`,
        display: bodyOffsetWidth < bodyScrollWidth ? "block" : "none"
      },
      verticalEl.getAttribute("style")
    )
    verticalEl.setAttribute("style", _style)
  }

  return {
    updateBodySize,
    updateHorizontalBarStyle,
    updateVerticalBarStyle
  }
}

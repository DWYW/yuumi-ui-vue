import { getCss } from "../../../share/helper"

export function useStopPenetrate() {
  const store = {
    overflow: "",
    scrollLeft: 0,
    scrollTop: 0
  }

  function saveScrollBehavior() {
    store.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
    store.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    store.overflow = getCss(document.body, "overflow") || ""

    updateOverflow("hidden")
  }

  function restoreScrollBehavior() {
    document.body.scrollLeft = document.documentElement.scrollLeft = store.scrollLeft
    document.body.scrollTop = document.documentElement.scrollTop = store.scrollTop
    updateOverflow(store.overflow)

    store.scrollLeft = 0
    store.scrollTop = 0
    store.overflow = ""
  }

  function updateOverflow(value: string) {
    let style = document.body.getAttribute("style") || ""

    if (/overflow/.test(style)) {
      style = style.replace(/overflow.*?;/, `overflow: ${value};`)
    } else {
      style += `overflow: ${value};`
    }

    document.body.setAttribute("style", style)
  }

  return {
    saveScrollBehavior,
    restoreScrollBehavior
  }
}

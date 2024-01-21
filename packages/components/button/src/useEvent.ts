import type { Ref, SetupContext } from "vue"
import type { ButtonEmits } from "./emits"
import type { ButtonProps } from "./props"

export function useEvent(
  props: ButtonProps,
  emit: SetupContext<ButtonEmits>["emit"],
  refs: Record<string, Ref<any>>
) {
  /**
   * 添加splash动画
   * @param e Mouse Event
   */
  function addSplash(e: MouseEvent) {
    const { left, top, width } = (refs.btnRef.value as HTMLElement).getBoundingClientRect()
    const size = Math.max(e.pageX - left, width - (e.pageX - left))
    const splash = {
      size: size * 2,
      x: e.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft) - left - size,
      y: e.pageY - (document.body.scrollTop || document.documentElement.scrollTop) - top - size
    }
    const element = document.createElement("span")
    element.setAttribute(
      "style",
      `left: ${splash.x}px; top: ${splash.y}px; width: ${splash.size}px; height: ${splash.size}px;`
    )

    const parentElement = refs.splashRef.value as HTMLElement
    parentElement.insertBefore(element, parentElement.firstChild)

    window.setTimeout(() => {
      parentElement && parentElement.removeChild(element)
    }, 300)
  }

  function hanlderClick(e: MouseEvent) {
    emit("click", e)

    if (props.splash) {
      addSplash(e)
    }
  }

  return {
    hanlderClick
  }
}

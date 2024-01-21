import { computed } from "vue"
import type { ComputedRef } from "vue"
import type { RatioImageProps } from "./props"

export function useStyle(props: ComputedRef<RatioImageProps>) {
  function getModeStyle(mode: string) {
    const modeStyle: { [x: string]: object } = {
      scaleToFill: { backgroundSize: "100% 100%" },
      aspectFit: { backgroundSize: "contain", backgroundPosition: "center" },
      aspectFill: { backgroundSize: "cover", backgroundPosition: "center" },
      top: { backgroundPosition: "top center" },
      bottom: { backgroundPosition: "bottom center" },
      center: { backgroundPosition: "center" },
      left: { backgroundPosition: "center left" },
      right: { backgroundPosition: "center right" },
      "top left": { backgroundPosition: "top left" },
      "top right": { backgroundPosition: "top right" },
      "bottom left": { backgroundPosition: "bottom left" },
      "bottom right": { backgroundPosition: "bottom right" }
    }

    return modeStyle[mode] || {}
  }

  const baseStyle = computed(() => ({
    borderRadius: `${props.value.radius}px`
  }))

  const imageStyle = computed(() => {
    const style: { [x: string]: string } = {}
    if (props.value.image) {
      style.backgroundImage = `url(${props.value.image})`
    }
    return Object.assign({}, getModeStyle(props.value.mode), baseStyle.value, style)
  })

  const placeholderStyle = computed(() => {
    const style: { [x: string]: string } = {}
    if (props.value.placeholderImage) {
      style.backgroundImage = `url(${props.value.placeholderImage})`
    }
    return Object.assign({}, baseStyle.value, style)
  })

  return {
    imageStyle,
    placeholderStyle
  }
}

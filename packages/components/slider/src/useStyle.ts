import { computed } from "vue"
import type { ComputedRef } from "vue"
import type { SliderProps } from "./props"

export function useStyle(props: ComputedRef<SliderProps>) {
  const contentStyle = computed(() => {
    const res: { [x: string]: string } = {}
    if (props.value.vertical) {
      res.width = `${props.value.size}px`
      res.height = `calc(100% - ${props.value.size * 6}px)`
      res.margin = `${props.value.size * 3}px ${props.value.size * 2}px`
    } else {
      res.height = `${props.value.size}px`
      res.margin = `${props.value.size * 2}px ${props.value.size * 3}px`
    }
    return res
  })

  function getBackground(colors?: string[]) {
    if (!colors) return {}
    if (colors.length > 1) {
      const angle = props.value.vertical ? (props.value.reverse ? "180deg" : "0deg") : "90deg"
      return { backgroundImage: `linear-gradient(${angle}, ${colors.toString()})` }
    }
    return { backgroundColor: colors[0] }
  }

  const sliderBarStyle = computed(() => {
    const res: { [x: string]: string } = {}
    if (props.value.disabled) return res
    return Object.assign(res, getBackground(props.value.colors))
  })

  const barStyle = computed(() => {
    const res: { [x: string]: string } = {}
    return Object.assign(res, getBackground(props.value.backgroundColors))
  })

  const btnStyle = computed(() => {
    return <{ [x: string]: string }>{
      width: `${props.value.size * 3}px`,
      height: `${props.value.size * 3}px`,
      borderColor: props.value.disabled ? "" : props.value.btnColor
    }
  })

  return {
    contentStyle,
    sliderBarStyle,
    barStyle,
    btnStyle
  }
}

import { computed } from "vue"
import type { ComputedRef, SetupContext } from "vue"
import type { NumberInputProps } from "./props"
import type { NumberInputEmits } from "./emits"

export function useEvent(
  props: ComputedRef<NumberInputProps>,
  emit: SetupContext<NumberInputEmits>["emit"],
  valueGetter: () => number,
  valueSetter: (value: number) => void,
  updateFocusState: (value: boolean) => void
) {
  const _min = computed(() => props.value.min)
  const _max = computed(() => props.value.max)

  // 数字精度 0.1 + 0.2 = 0.30000000000000004
  const accuracy = computed(() => {
    const splits = props.value.step.toString().split(".") || ["", ""]
    return (splits[1] || "").length
  })

  function decreaseHandler() {
    if (props.value.disabled) return
    let _value = valueGetter() - props.value.step
    if (_value < _min.value) {
      _value = _min.value
    }

    valueSetter(+_value.toFixed(accuracy.value))
  }

  function increaseHandler() {
    if (props.value.disabled) return

    let _value = valueGetter() + props.value.step
    if (_value > _max.value) {
      _value = _max.value
    }

    valueSetter(+_value.toFixed(accuracy.value))
  }

  function inputHandler(e: Event) {
    const target = e.target as HTMLInputElement
    // 检测输入的是否是合法数字
    if (target.value && !/^-?\d*(\.\d*)?$/.test(target.value)) {
      target.value = valueGetter().toString()
    }

    emit("input", e)
  }

  function changeHandler(e: Event) {
    const target = e.target as HTMLInputElement
    let res = target.value
    // 将输入的字符串转为合法的字符串
    if (target.value === "") {
      res = "0"
    }

    res = res
      // 去除负数前面的多个零
      .replace(/^-0{2,}\./, "-0.")
      .replace(/^-0{2,}(?=\d+)/, "-")
      // 去除正数前面的多个零
      .replace(/^0{2,}\./, "0.")
      .replace(/^0{2,}(?=\d+)/, "")
      // 去除小数末尾的多个零
      .replace(/\.0*$/, "")
      .replace(/\.(\d+?)0*$/, ".$1")
    0
    target.value = (+res).toFixed(accuracy.value)
    valueSetter(+target.value)
  }

  function hanlderFocus(e: Event) {
    updateFocusState(true)
    emit("focus", e)
  }

  function blurHandler(e: Event) {
    updateFocusState(false)
    emit("blur", e)
  }

  return {
    decreaseHandler,
    increaseHandler,
    inputHandler,
    changeHandler,
    hanlderFocus,
    blurHandler
  }
}

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

  function getAvailableValue(value: number) {
    if (value < _min.value) return _min.value
    if (value > _max.value) return _max.value
    return value
  }

  // 数字精度 0.1 + 0.2 = 0.30000000000000004
  const accuracy = computed(() => {
    if (!props.value.step) return 0
    const splits = props.value.step.toString().split(".") || ["", ""]
    return (splits[1] || "").length
  })

  function decreaseHandler() {
    if (props.value.disabled) return
    const _value = getAvailableValue(valueGetter() - (props.value.step || 1))
    valueSetter(+_value.toFixed(accuracy.value))
  }

  function increaseHandler() {
    if (props.value.disabled) return
    const _value = getAvailableValue(valueGetter() + (props.value.step || 1))
    valueSetter(+_value.toFixed(accuracy.value))
  }

  function inputHandler(e: Event) {
    emit("input", e)
  }

  function changeHandler(e: Event) {
    const target = e.target as HTMLInputElement
    let res = target.value || "0"

    // 检测输入的是否是合法数字
    if (target.value && !/^-?\d*(\.\d*)?$/.test(target.value)) {
      res = valueGetter().toString()
    } else {
      res = res
        // 去整数前面的多个零
        .replace(/^(-?)0{1,}(?=\d+)/, "$1")
        .replace(/^(-?)0*(?=\.)/, "$10")
        // 去除小数末尾的多个零
        .replace(/(?<=\.\d*)(0*?)$/, "")
        .replace(/\.$/, "")
    }

    // 将输入的字符串转为合法的数字，并保留指定的精度
    const _value = accuracy.value
      ? +getAvailableValue(+res).toFixed(accuracy.value)
      : getAvailableValue(+res)
    target.value = _value.toString()
    valueSetter(_value)
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

import { nextTick, onMounted } from "vue"
import type { ComputedRef, Ref } from "vue"
import type { InputProps } from "./props"

export function useAutoFocus(props: ComputedRef<InputProps>, input: Ref<HTMLInputElement>) {
  onMounted(() => {
    nextTick(() => {
      if (props.value.autoFocus) {
        input.value.focus()
      }
    })
  })
}

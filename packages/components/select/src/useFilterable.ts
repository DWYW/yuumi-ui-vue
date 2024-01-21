import { ref } from "vue"
import type { Ref } from "vue"

export interface SelectFilterable {
  input: Ref<any>
  keyword: Ref<string>
  hanlderKeywordInput: (e: Event) => void
  setKeywordInputFocus: () => void
  setKeywordValue: (value: string) => void
}

export function useFilterable(): SelectFilterable {
  const input = ref()
  const keyword = ref("")
  let timer: any = null

  function hanlderKeywordInput(e: Event) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      keyword.value = (e.target as HTMLInputElement).value
    }, 200)
  }

  function setKeywordInputFocus() {
    if (input.value) {
      input.value.focus()
    }

    keyword.value = ""
  }

  function setKeywordValue(value: string) {
    if (value !== keyword.value) {
      keyword.value = value
    }
  }

  return {
    input,
    keyword,
    hanlderKeywordInput,
    setKeywordInputFocus,
    setKeywordValue
  }
}

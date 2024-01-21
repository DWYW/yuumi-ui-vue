import { nextTick, ref } from "vue"

export function useExpand() {
  const isExpand = ref(false)

  function updateExpandState(value: boolean) {
    isExpand.value = value
  }

  function childrenBeforeEnter(el: Element) {
    (<HTMLElement>el).style.height = "0px"
  }

  function childrenEnter(el: Element) {
    nextTick(() => {
      (<HTMLElement>el).style.height = `${el.scrollHeight}px`
    })
  }

  function childrenAfterEnter(el: Element) {
    (<HTMLElement>el).style.height = ""
  }

  function childrenBeforeLeave(el: Element) {
    (<HTMLElement>el).style.height = `${el.scrollHeight}px`
  }

  function childrenLeave(el: Element) {
    nextTick(() => {
      (<HTMLElement>el).style.height = "0px"
    })
  }

  function childrenAfterLeave(el: Element) {
    (<HTMLElement>el).style.height = ""
  }

  return {
    isExpand,
    updateExpandState,
    childrenBeforeEnter,
    childrenEnter,
    childrenAfterEnter,
    childrenBeforeLeave,
    childrenLeave,
    childrenAfterLeave
  }
}

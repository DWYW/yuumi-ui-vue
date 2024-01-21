<template>
  <div :ref="_refs.el" :class="[ns.n(), ns.m(behavior)]">
    <div :ref="_refs.body" :class="[ns.e('body')]">
      <slot />
    </div>
    <section
      :ref="_refs.horizontal"
      :class="[ns.e('horizontal')]"
      data-type="horizontal"
      @mousedown.stop="hanlderMousedown"
    />
    <section
      :ref="_refs.vertical"
      :class="[ns.e('vertical')]"
      data-type="vertical"
      @mousedown.stop="hanlderMousedown"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, onBeforeUnmount, computed } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { scrollbarEmits } from "./emits"
import { scrollbarProps } from "./props"
import { useStyle } from "./useStyle"
import { useEvent } from "./useEvent"
import { useObserver } from "./useObserver"
import type { ComputedRef } from "vue"
import type { ScrollbarProps } from "./props"

defineOptions({ name: "YuumiScrollbar" })
const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)
const ns = useNameSpace("scrollbar")
const _props: ComputedRef<ScrollbarProps> = computed(() => {
  return getComponentProps(props)
})
const _refs = {
  el: ref<HTMLElement>(),
  body: ref<HTMLElement>(),
  horizontal: ref<HTMLElement>(),
  vertical: ref<HTMLElement>()
}

const { updateBodySize, updateHorizontalBarStyle, updateVerticalBarStyle } = useStyle(
  _refs.body,
  _refs.horizontal,
  _refs.vertical
)

function onScroll(e: Event) {
  updateHorizontalBarStyle()
  updateVerticalBarStyle()
  emit("scroll", e)
}

const { hanlderMousedown } = useEvent(_props, _refs)
const { observe, disconnect } = useObserver(_refs.body, () => {
  updateHorizontalBarStyle(), updateVerticalBarStyle()
})

onMounted(() => {
  updateBodySize(), updateHorizontalBarStyle(), updateVerticalBarStyle()
  emit("init", exposeOption)

  if (_refs.body.value) {
    _refs.body.value.addEventListener("scroll", onScroll, false)
  }

  if (props.dynamic) {
    observe()
  }
})

onBeforeUnmount(() => {
  if (_refs.body.value) {
    _refs.body.value.removeEventListener("scroll", onScroll, false)
  }

  if (props.dynamic) {
    disconnect()
  }
})

onUpdated(() => {
  if (props.dynamic) {
    disconnect()
    observe()
  }
})

interface ScrollToOptions {
  left?: number
  top?: number
  behavior?: "auto" | "instant" | "smooth"
}

type ScrollToElementAlignment = "start" | "center" | "end"

const exposeOption = {
  refs: _refs,
  scrollTo: (option: ScrollToOptions) => {
    if (!_refs.body.value) return
    _refs.body.value.scrollTo(option)
  },
  scrollToElement: (
    selector: string | HTMLElement,
    option?: ScrollToOptions,
    align?: ScrollToElementAlignment
  ) => {
    const bodyEl = _refs.body.value
    if (!bodyEl) return
    const targetEl = typeof selector === "string" ? bodyEl.querySelector(selector) : selector
    if (!targetEl) return
    const targetRect = targetEl.getBoundingClientRect()
    const bodyRect = bodyEl.getBoundingClientRect()

    const offset = { x: 0, y: 0 }
    if (align === "center") {
      offset.x = bodyEl.clientWidth / 2 - targetRect.width / 2
      offset.y = bodyEl.clientHeight / 2 - targetRect.height / 2
    } else if (align === "end") {
      offset.x = bodyEl.clientWidth - targetRect.width
      offset.y = bodyEl.clientHeight - targetRect.height
    }

    bodyEl.scrollTo(
      Object.assign({}, option, {
        top: targetRect.top - bodyRect.top + bodyEl.scrollTop - offset.y,
        left: targetRect.left - bodyRect.left + bodyEl.scrollLeft - offset.x
      })
    )
  }
}
defineExpose(exposeOption)
</script>

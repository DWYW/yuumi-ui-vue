<template>
  <div :class="ns.e('time')">
    <div :class="ns.eb('time', 'split')" />
    <YuumiScrollbar :ref="_refs.scrollbar" @init="initHandler" @scroll="scrollHandler">
      <div
        v-for="(item, index) in values"
        :key="item.value"
        :class="[
          ns.eb('time', 'item'),
          ns.is('_selected', item.value === selected),
          ns.is('_disabled', item.disabled),
          ns.is('_first', index === 0),
          ns.is('_last', index === values.length - 1)
        ]"
        @click="selectHandler(item)"
      >
        {{ item.label }}
      </div>
    </YuumiScrollbar>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { debounce } from "../../../share/helper"
import type { PropType } from "vue"

export interface ValueItem {
  label: string
  value: number
  disabled?: boolean
}

const props = defineProps({
  modelValue: Number,
  values: {
    type: Array as PropType<ValueItem[]>,
    required: true
  }
})
const emit = defineEmits(["select"])
const ns = useNameSpace("timepicker")

const _refs = {
  scrollbar: ref()
}

const selected = ref(NaN)

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (value === oldValue || value === selected.value) return

    let target = props.values.find(item => item.value === value)
    // 如果没有对应的可选项，重置为第一个可选项
    if (!target || target.disabled) {
      target = props.values.find(item => !item.disabled)
    }

    // 同步modelValue值到selected
    if (target && target.value !== selected.value) {
      selected.value = target.value
    }
  },
  { immediate: true }
)

watch(
  () => props.values.map(item => item.disabled).toString(),
  (value, oldValue) => {
    if (value === oldValue || !props.modelValue) return
    let target: ValueItem | undefined = props.values[props.modelValue]
    if (target && !target.disabled) return
    // 如果选项变为disabled，重置为第一个可选项
    target = props.values.find(item => !item.disabled)
    if (target) {
      selected.value = target.value
    }
  }
)

watch(
  () => selected.value,
  (value, oldValue) => {
    if (value === oldValue) return
    // 定位到选中的元素
    nextTick(scrollToSelected)
  }
)

watch(
  () => props.values,
  value => {
    // 如果选中的项变为不可用，重置为第一个可选项
    let target = value.find(item => item.value === selected.value)
    if (target && !target.disabled) return

    target = props.values.find(item => !item.disabled)
    if (target && target.value !== selected.value) {
      selected.value = target.value
    }
  }
)

function scrollToSelected() {
  if (!_refs.scrollbar.value) return
  _refs.scrollbar.value.scrollToElement("._selected", null, "center")
}

let itemHeight = 0
const setSelectedWithScrollTop = debounce((e: Event) => {
  const target = e.target as HTMLElement
  const scrollTop = target.scrollTop
  const index = Math.abs(Math.ceil((scrollTop - itemHeight / 2) / itemHeight))

  let item = props.values[index]
  // 寻找滚动方向相反的最近一个可用选项
  if (item.disabled) {
    const step = item.value < props.modelValue! ? 1 : -1
    let index = item.value
    while ((step > 0 && index <= props.modelValue!) || (step < 0 && index >= props.modelValue!)) {
      item = props.values[index]
      if (!item.disabled) break
      index += step
    }
  }

  selectHandler(item)
}, 200)

const selectHandler = debounce((item: ValueItem) => {
  if (item.value === props.modelValue || item.disabled) {
    return scrollToSelected()
  }
  selected.value = item.value
  emit("select", selected.value)
}, 16)

function initHandler({ refs }: any) {
  itemHeight = refs.body.value.querySelector(`.${ns.eb("time", "item")}`).clientHeight
  scrollToSelected()
}

function scrollHandler(e: Event) {
  setSelectedWithScrollTop(e)
}
</script>

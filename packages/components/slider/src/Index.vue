<template>
  <div
    :class="[
      ns.n(),
      ns.is(ns.m('vertical'), vertical),
      ns.is(ns.m('horizontal'), !vertical),
      ns.is(ns.m('disabled'), disabled)
    ]"
  >
    <div :ref="_refs.content" :class="ns.e('content')" :style="contentStyle">
      <div :class="ns.e('bar')" :style="sliderBarStyle">
        <div v-if="range" :class="ns.em('bar', 'min')" :style="minBarStyle" />

        <div :class="ns.em('bar', 'max')" :style="maxBarStyle" />

        <div :class="ns.e('stops')">
          <div
            v-for="(item, index) in stops"
            :key="index"
            :class="ns.eb('stops', 'item')"
            :style="item"
          />
        </div>
      </div>

      <div :class="ns.e('btn')">
        <YuumiPopper
          v-if="range"
          :ref="(c: any) => setPopperRef(c, 0)"
          :class="ns.e('tooltip')"
          type="custom"
          :placement="tooltipPlacement"
        >
          <div :class="ns.e('value')">
            {{ formatter ? formatter(currentValue[0]) : currentValue[0] }}
          </div>
          <template #trigger>
            <div
              :class="[ns.em('btn', 'min'), ns.is('_selected', activedIndex === 0)]"
              :style="minBtnStyle"
              data-index="0"
              @mousedown="mousedownHandler"
              @mouseenter="mouseenterHandler"
              @mouseleave="mouseleaveHandler"
            />
          </template>
        </YuumiPopper>

        <YuumiPopper
          :ref="(c: any) => setPopperRef(c, 1)"
          :class="ns.e('tooltip')"
          type="custom"
          :placement="tooltipPlacement"
        >
          <div :class="ns.e('value')">
            {{ formatter ? formatter(currentValue[1]) : currentValue[1] }}
          </div>
          <template #trigger>
            <div
              :class="[ns.em('btn', 'max'), ns.is('_selected', activedIndex === 1)]"
              :style="maxBtnStyle"
              data-index="1"
              @mousedown="mousedownHandler"
              @mouseenter="mouseenterHandler"
              @mouseleave="mouseleaveHandler"
            />
          </template>
        </YuumiPopper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { createRange } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { SliderProps, sliderProps } from "./props"
import { sliderEmits } from "./emits"
import { useStyle } from "./useStyle"
import { useEvent } from "./useEvent"
import { useTooltip } from "./useTooltip"

defineOptions({ name: "YuumiSlider" })
const ns = useNameSpace("slider")
const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const _refs = {
  content: ref(),
  poppers: ref<any[]>([])
}

function setPopperRef(c: any, index: number) {
  _refs.poppers.value[index] = c
}

const _props = computed<SliderProps>(() => getComponentProps(props))
const { contentStyle, sliderBarStyle, barStyle, btnStyle } = useStyle(_props)
// 较少心智负担
const min = computed(() => Math.min(props.min, props.max))
const max = computed(() => Math.max(props.min, props.max))

function getValueByModel() {
  const res = [min.value, min.value]
  if (props.modelValue instanceof Array) {
    res[0] = Math.max(Math.min(...props.modelValue), min.value)
    res[1] = Math.min(Math.max(...props.modelValue), max.value)
  } else if (typeof props.modelValue === "number") {
    res[1] = Math.min(Math.max(props.modelValue || 0, min.value), max.value)
  }

  return res
}

watch(
  () => (props.modelValue || []).toString(),
  value => {
    if (!value || value === confirmValue.value.toString()) return
    currentValue.value = getValueByModel()
    confirmValue.value = getValueByModel()
  }
)
// 用作实时显示
const currentValue = ref(getValueByModel())
// 用作最后的确认值
const confirmValue = ref(getValueByModel())
const total = computed(() => Math.abs(max.value - min.value))

const stateKey = computed(() => `${props.vertical}:${props.reverse}`)
const minBarStyle = computed(() => {
  const _value = currentValue.value[0] - min.value
  const generate: { [x: string]: () => void } = {
    "true:true": () => ({ top: `${(_value / total.value - 1) * 100}%` }),
    "true:false": () => ({ top: `${(1 - _value / total.value) * 100}%` }),
    "false:true": () => ({ left: `${(1 - _value / total.value) * 100}%` }),
    "false:false": () => ({ left: `${(_value / total.value - 1) * 100}%` })
  }
  return Object.assign({}, barStyle.value, generate[stateKey.value]())
})
const maxBarStyle = computed(() => {
  const _value = currentValue.value[1] - min.value
  const generate: { [x: string]: () => void } = {
    "true:true": () => ({ top: `${(_value / total.value) * 100}%` }),
    "true:false": () => ({ top: `${(0 - _value / total.value) * 100}%` }),
    "false:true": () => ({ left: `${(0 - _value / total.value) * 100}%` }),
    "false:false": () => ({ left: `${(_value / total.value) * 100}%` })
  }
  return Object.assign({}, barStyle.value, generate[stateKey.value]())
})

const minBtnStyle = computed(() => {
  const _value = currentValue.value[0] - min.value
  const generate: { [x: string]: () => void } = {
    "true:true": () => ({ top: `${(_value / total.value) * 100}%` }),
    "true:false": () => ({ top: `${(1 - _value / total.value) * 100}%` }),
    "false:true": () => ({ left: `${(1 - _value / total.value) * 100}%` }),
    "false:false": () => ({ left: `${(_value / total.value) * 100}%` })
  }
  return Object.assign({}, btnStyle.value, generate[stateKey.value]())
})
const maxBtnStyle = computed(() => {
  const _value = currentValue.value[1] - min.value
  const generate: { [x: string]: () => void } = {
    "true:true": () => ({ bottom: `${(1 - _value / total.value) * 100}%` }),
    "true:false": () => ({ bottom: `${(_value / total.value) * 100}%` }),
    "false:true": () => ({ right: `${(_value / total.value) * 100}%` }),
    "false:false": () => ({ right: `${(1 - _value / total.value) * 100}%` })
  }
  return Object.assign({}, btnStyle.value, generate[stateKey.value]())
})

const stops = computed(() => {
  if (!props.showStops) return []
  const num = Math.floor(total.value / props.step)
  return createRange(1, num - 1, i => {
    return {
      width: `${props.size / 2}px`,
      height: `${props.size / 2}px`,
      top: props.vertical ? `${(i / num) * 100}%` : void 0,
      left: props.vertical ? void 0 : `${(i / num) * 100}%`
    }
  })
})

const { showPopper, updatePopper, hidePopper } = useTooltip(_props, _refs.poppers)
// 用于记录首次激活的索引值
let startIndex = 0
// 用于记录实现激活的索引值
const activedIndex = ref(-1)

const { onMousedown } = useEvent(detail => {
  const getNextValue = () => {
    const el = _refs.content.value as HTMLElement
    const maps: { [x: string]: () => number } = {
      "true:true": () => (detail.vertical / el.clientHeight) * total.value,
      "true:false": () => ((0 - detail.vertical) / el.clientHeight) * total.value,
      "false:true": () => ((0 - detail.horizontal) / el.clientWidth) * total.value,
      "false:false": () => (detail.horizontal / el.clientWidth) * total.value
    }
    const value = Math.round(maps[stateKey.value]() + confirmValue.value[startIndex])
    let nextValue = Math.max(Math.min(value, max.value), min.value)
    // 处理步长
    nextValue = Math.round(nextValue / props.step) * props.step
    return nextValue
  }

  const normalUpdate = (value: number) => {
    activedIndex.value = startIndex
    if (detail.done) {
      activedIndex.value = -1
      confirmValue.value[startIndex] = currentValue.value[startIndex]
    } else {
      currentValue.value[startIndex] = value
      currentValue.value[startIndex ^ 1] = confirmValue.value[startIndex ^ 1]
    }
  }

  const specialUpdate = (value: number) => {
    activedIndex.value = startIndex ^ 1
    if (detail.done) {
      activedIndex.value = -1
      confirmValue.value[startIndex] = currentValue.value[startIndex]
      confirmValue.value[startIndex ^ 1] = currentValue.value[startIndex ^ 1]
    } else {
      currentValue.value[startIndex] = confirmValue.value[startIndex ^ 1]
      currentValue.value[startIndex ^ 1] = value
    }
  }

  const updateValue = [
    (value: number) => {
      value <= confirmValue.value[1] ? normalUpdate(value) : specialUpdate(value)
    },
    (value: number) => {
      value >= confirmValue.value[0] ? normalUpdate(value) : specialUpdate(value)
    }
  ]

  updateValue[startIndex](getNextValue())
})

const tooltipPlacement = computed(() => {
  return props.placement || (props.vertical ? "right" : "top")
})

function mousedownHandler(e: MouseEvent) {
  if (props.disabled) return
  const target = e.target as HTMLElement
  startIndex = Number(target.dataset.index || "0")
  onMousedown(e)
}

function mouseenterHandler(e: MouseEvent) {
  if (activedIndex.value !== -1) return
  setTimeout(() => {
    const target = e.target as HTMLElement
    const _index = Number(target.dataset.index)
    showPopper(_index || 0)
  })
}

function mouseleaveHandler(e: MouseEvent) {
  if (activedIndex.value === -1) {
    const target = e.target as HTMLElement
    const _index = Number(target.dataset.index)
    hidePopper(_index)
  }
}

watch(
  () => currentValue.value.toString(),
  (value, oldValue) => {
    if (value === oldValue) return
    const _value = props.range ? currentValue.value : currentValue.value[1]
    emit("changing", _value)

    if (activedIndex.value === -1) return
    updatePopper(activedIndex.value)
  }
)

watch(
  () => activedIndex.value,
  (value, oldValue) => {
    if (value === oldValue) return
    if (value !== -1) showPopper(value)
    if (oldValue !== -1) hidePopper(oldValue)
  }
)

watch(
  () => confirmValue.value.toString(),
  (value, oldValue) => {
    if (value === oldValue) return
    if (props.modelValue && props.modelValue.toString() === value) return
    const _value = props.range ? confirmValue.value : confirmValue.value[1]
    emit("update:modelValue", _value)
    emit("change", _value)
  }
)
</script>

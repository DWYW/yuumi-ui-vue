<template>
  <YuumiPopper
    :ref="_refs.popper"
    :class="ns.e('popper')"
    :disabled="disabled || readonly"
    stop
    @beforeEnter="beforeEnterHandler"
    @beforeLeave="beforeLeaveHandler"
  >
    <template #trigger>
      <div
        :ref="_refs.el"
        :class="[
          ns.n(),
          ns.m(size),
          ns.is(ns.m('focus'), state.isFocus),
          ns.is(ns.m('disabled'), disabled),
          ns.is(ns.m('readonly'), readonly)
        ]"
        v-bind="$attrs"
        @mouseenter="mouseenterHandler"
        @mouseleave="mouseLeaveHandler"
      >
        <ContentComponent @clear="clearHandler" />
      </div>
    </template>
    <template #default>
      <PickerComponent />
      <div :class="ns.e('btn')">
        <span @click="cancelHandler">{{ props.cancelBtnText }}</span>
        <span @click="confirmHandler">{{ props.confirmBtnText }}</span>
      </div>
    </template>
  </YuumiPopper>
</template>

<script setup lang="ts">
import { ref, provide, computed, watch } from "vue"
import { createRange, timeParse } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { TimePickerProps, timePickerProps } from "./props"
import { TimePickerEmits, timePickerEmits } from "./emits"
import { propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import { useState } from "./useState"
import { useSelection } from "./useSelection"
import ContentComponent from "./Content.vue"
import PickerComponent from "./Picker.vue"
import { YuumiPopper } from "../../popper"

defineOptions({ name: "YuumiTimePicker", inheritAttrs: false })
const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)
const ns = useNameSpace("timepicker")

const _refs = {
  popper: ref<any>(),
  el: ref<HTMLElement>()
}

const _props = computed<TimePickerProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)
const { state, updateState } = useState()
provide(stateProvideKey, state)
const selection = useSelection()
provide(selectionProvideKey, selection)

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (!value || value === oldValue) return
    const _value = value instanceof Array ? value : [value]
    const _start = timeParse(_value[0], props.format)
    _value[0] && tryResetDisabledItem(_start)
    _value[0] &&
      _start.forEach((item, index) => {
        selection.itemSelected(index, item)
      })

    const _end = timeParse(_value[1], props.format)
    _value[1] && tryResetDisabledItem(_end, _start)
    _value[1] &&
      _end.forEach((item, index) => {
        selection.itemSelected(index, item, true)
      })

    tryUpdate(["change"])
  },
  { immediate: true }
)

watch(
  () => [selection.startValue.value, selection.endValue.value].toString(),
  () => {
    if (props.immediate) {
      tryUpdate()
    }
  }
)

/**
 * 尝试重写被disabled的值
 * @param value 当前值
 * @param dependence 依赖值
 */
function tryResetDisabledItem(value: number[], dependence?: number[]) {
  if (state.value.isFocus) return
  const getter = [props.disabledHours, props.disabledMinutes, props.disabledSeconds]
  const values = [
    createRange<number>(0, 23),
    createRange<number>(0, 59),
    createRange<number>(0, 59)
  ]

  value.forEach((item, index) => {
    if (typeof getter[index] !== "function") return
    let suffix: number[] = []
    if (dependence && value.slice(0, index).toString() === dependence.slice(0, index).toString()) {
      suffix = createRange<number>(0, dependence[index] - 1)
    }
    const disabled = new Set(getter[index]!(...value).concat(suffix))
    if (!disabled.has(item)) return
    const v = (values[index] || []).find(i => !disabled.has(i))
    if (v) {
      value[index] = v
    }
  })
}

/**
 * 尝试更新并触发事件
 * @param omits 忽略的事件名称
 */
function tryUpdate(omits?: (keyof TimePickerEmits)[]) {
  let _modelValue = props.range
    ? [
        selection.valueStringfy(selection.startValue.value, props.format),
        selection.valueStringfy(selection.endValue.value, props.format)
      ]
    : selection.valueStringfy(selection.startValue.value, props.format)

  if (String(_modelValue) === String(props.modelValue)) return
  if (String(_modelValue) === ",") {
    _modelValue = []
  }

  const ignore = new Set(omits)
  if (!ignore.has("update:modelValue")) {
    emit("update:modelValue", _modelValue)
  }

  if (!ignore.has("change")) {
    emit("change", _modelValue)
  }
}

/** ----- events ----- */
function beforeEnterHandler() {
  selection.save()
  updateState("isFocus", true)
}

function beforeLeaveHandler() {
  updateState("isFocus", false)
  if (!props.immediate) {
    tryUpdate()
  }
}

function mouseenterHandler() {
  if (props.clearable && selection.startValue.value.length) {
    updateState("isCanClear", true)
  }
}

function mouseLeaveHandler() {
  updateState("isCanClear", false)
}

function cancelHandler() {
  selection.restore()
  _refs.popper.value!.hidePopper()
}

function confirmHandler() {
  _refs.popper.value!.hidePopper()
}

function clearHandler() {
  if (state.value.isFocus) {
    const now = new Date()
    const values = [now.getHours(), now.getMinutes(), now.getSeconds()]
    values.forEach((item, index) => {
      selection.itemSelected(index, item)
      selection.itemSelected(index, item, true)
    })
  } else {
    selection.clear()
    updateState("isCanClear", false)
    tryUpdate()
  }
}
</script>

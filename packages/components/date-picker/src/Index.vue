<template>
  <YuumiPopper
    :ref="_refs.popper"
    :class="ns.e('popper')"
    :disabled="disabled || readonly"
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
      <PickerComponent @update:errMsg="updateErrMsgHandler" />
      <div :class="ns.e('btn')">
        <span :class="ns.em('msg', 'err')">{{ errMsg }}</span>
        <span @click="cancelHandler">{{ props.cancelBtnText }}</span>
        <span @click="confirmHandler">{{ props.confirmBtnText }}</span>
      </div>
    </template>
  </YuumiPopper>
</template>

<script setup lang="ts">
import { ref, provide, computed, watch } from "vue"
import { createRange } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { DatePickerProps, datePickerProps } from "./props"
import { DatePickerEmits, datePickerEmits } from "./emits"
import { formatProvideKey, propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import { useState } from "./useState"
import { useSelection } from "./useSelection"
import { useFormat } from "./useFormat"
import ContentComponent from "./Content.vue"
import PickerComponent from "./Picker.vue"
import { getDisabledHours, getDisabledMinutes, getDisabledSeconds } from "./helper"

defineOptions({ name: "YuumiDatePicker", inheritAttrs: false })
const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)
const ns = useNameSpace("datepicker")

const _refs = {
  popper: ref<any>(),
  el: ref<HTMLElement>()
}

const _props = computed<DatePickerProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)
const { state, updateState } = useState(_props)
provide(stateProvideKey, state)
const selection = useSelection()
provide(selectionProvideKey, selection)
provide(formatProvideKey, useFormat(_props))

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (!value || String(value) === String(oldValue)) return
    const _value = value instanceof Array ? value : [value]
    if (_value[0]) {
      const _start = new Date(_value[0].toString())
      tryResetDisabledTimes(_start)
      selection.updateSelected(_start)
    }

    if (_value[1]) {
      const _end = new Date(_value[1].toString())
      tryResetDisabledTimes(_end, selection.startValue.value)
      selection.updateSelected(_end, true)
    }

    tryUpdate(["change"])
  },
  { immediate: true }
)

function tryResetDisabledTimes(value: Date, dependence?: Date) {
  const getters = [
    () => new Set<number>(getDisabledHours(props.disabledHours, value, dependence)),
    () => new Set<number>(getDisabledMinutes(props.disabledMinutes, value, dependence)),
    () => new Set<number>(getDisabledSeconds(props.disabledSeconds, value, dependence))
  ]
  const setters = [
    (v: number) => value.setHours(v),
    (v: number) => value.setMinutes(v),
    (v: number) => value.setSeconds(v)
  ]
  const values = [
    createRange<number>(0, 23),
    createRange<number>(0, 59),
    createRange<number>(0, 59)
  ] as number[][]

  ;[value.getHours(), value.getMinutes(), value.getSeconds()].forEach((item, index) => {
    const disabled = getters[index]()
    if (!disabled.has(item)) return
    const v = values[index].find(v => !disabled.has(v))
    if (!v) return
    setters[index](v)
  })
}
/**
 * 尝试更新并触发事件
 * @param omits 忽略的事件名称
 */
function tryUpdate(omits?: (keyof DatePickerEmits)[]) {
  let modelValue = state.value.isRange
    ? [selection.startValue.value, selection.endValue.value].filter(item => !!item)
    : selection.startValue.value

  if (modelValue instanceof Array) {
    if (modelValue.length === 1) {
      selection.restore()
      return
    }

    if (modelValue.length === 0) {
      modelValue = []
    }
  }

  if (String(modelValue) === String(props.modelValue)) return

  const ignore = new Set(omits)
  if (!ignore.has("update:modelValue")) {
    emit("update:modelValue", modelValue)
  }

  if (!ignore.has("change")) {
    emit("change", modelValue)
  }
}

/** ----- events ----- */
function beforeEnterHandler() {
  selection.save()
  updateState("isFocus", true)
}

function beforeLeaveHandler() {
  updateState("isFocus", false)
  tryUpdate()
}

function mouseenterHandler() {
  if (props.clearable && !!selection.startValue.value) {
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
  selection.clear()
  updateState("isCanClear", false)
  tryUpdate()
  if (_refs.popper.value) {
    _refs.popper.value.hidePopper()
  }
}

const errMsg = ref("")
function updateErrMsgHandler(msg: string) {
  errMsg.value = msg
}
</script>

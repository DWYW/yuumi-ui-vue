<template>
  <div
    :class="[
      ns.n(),
      ns.m(size),
      ns.bm('placement', btnPlacement),
      ns.is(ns.m('focus'), isFocus || isHover),
      ns.is(ns.m('btn-hidden'), hideBtn)
    ]"
  >
    <div :class="ns.e('content')">
      <input
        type="text"
        :disabled="disabled"
        :value="currentValue"
        @input="inputHandler"
        @change="changeHandler"
        @focus="hanlderFocus"
        @blur="blurHandler"
      />
    </div>

    <div v-if="!hideBtn" :class="ns.e('btn')">
      <div
        :class="[ns.eb('btn', 'decrease'), ns.is('_disabled', decreaseDisabled)]"
        @click="decreaseHandler"
        @mouseenter="onMouseenter(-1)"
        @mouseleave="onMouseleave"
      >
        <YuumiIcon v-if="btnPlacement !== 'default'" icon="line-arrow-bottom" />
        <span v-else>-</span>
      </div>

      <div
        :class="[ns.eb('btn', 'increase'), ns.is('_disabled', increaseDisabled)]"
        @click="increaseHandler"
        @mouseenter="onMouseenter(1)"
        @mouseleave="onMouseleave"
      >
        <YuumiIcon v-if="btnPlacement !== 'default'" icon="line-arrow-top" />
        <span v-else>+</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { numberInputEmits } from "./emits"
import { numberInputProps } from "./props"
import { useState } from "./useState"
import { useEvent } from "./useEvent"
import type { ComputedRef } from "vue"
import type { NumberInputProps } from "./props"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiNumberInput" })
const props = defineProps(numberInputProps)
const emit = defineEmits(numberInputEmits)
const ns = useNameSpace("number-input")

const _props: ComputedRef<NumberInputProps> = computed(() => {
  return getComponentProps(props)
})

function getInitValue(data?: number | string) {
  data = Number(data)
  if (data < props.min + 1) {
    data = props.min
  } else if (data > props.max - 1) {
    data = props.max
  }
  return data
}
const currentValue = ref(getInitValue(props.modelValue))

watch(
  () => currentValue.value,
  (value, oldValue) => {
    emit("update:modelValue", value)
    if (value !== oldValue) {
      emit("change", value)
    }
  }
)

function valueGetter() {
  return currentValue.value
}

function valueSetter(value: number) {
  currentValue.value = value
}

const {
  increaseDisabled,
  decreaseDisabled,
  isFocus,
  isHover,
  updateFocusState,
  onMouseenter,
  onMouseleave
} = useState(_props, currentValue)

const { decreaseHandler, increaseHandler, inputHandler, changeHandler, hanlderFocus, blurHandler } =
  useEvent(_props, emit, valueGetter, valueSetter, updateFocusState)
</script>

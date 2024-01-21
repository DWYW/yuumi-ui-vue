<template>
  <label
    :class="[
      ns.n(),
      ns.m(size),
      ns.is(ns.m('focus'), isFocus),
      ns.is(ns.m('disabled'), disabled),
      ns.is(ns.m('readonly'), readonly),
      ns.is(ns.m('round'), round),
      ns.is(ns.m('prefix-icon'), hasPrefixIcon),
      ns.is(ns.m('prefix'), hasPrefix),
      ns.is(ns.m('suffix-icon'), hasSuffixIcon || isCanClear),
      ns.is(ns.m('suffix'), hasSuffix)
    ]"
    v-bind="binds.attrs"
    @mouseenter="mouseenterHandler"
    @mouseleave="mouseleaveHandler"
  >
    <span v-if="hasPrefixIcon || hasPrefix" :class="ns.e('prefix')">
      <slot name="prefix">
        <YuumiIcon v-if="prefixIcon" :icon="prefixIcon" />
      </slot>
    </span>

    <span :class="ns.e('content')">
      <input
        :ref="_refs.input"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        v-bind="binds.listeners"
        @input="inputHandler"
        @compositionstart="compositionstartHandler"
        @compositionend="compositionendHandler"
        @focus="focusHandler"
        @blur="blurHandler"
      />
    </span>

    <span v-if="hasSuffix || hasSuffixIcon || isCanClear" :class="ns.e('suffix')">
      <slot name="suffix">
        <YuumiIcon v-if="isCanClear" icon="line-circle-close" @click="hanlderClear" />

        <YuumiIcon v-else-if="suffixIcon" :icon="suffixIcon" />
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch, useAttrs } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { inputEmits } from "./emits"
import { inputProps } from "./props"
import { useState } from "./useState"
import { useEvent } from "./useEvent"
import { useAutoFocus } from "./useAutoFocus"
import { useClearable } from "./useClearable"
import type { ComputedRef } from "vue"
import type { InputProps } from "./props"

defineOptions({ name: "YuumiInput", inheritAttrs: false })
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const ns = useNameSpace("input")

const _props: ComputedRef<InputProps> = computed(() => {
  return getComponentProps(props)
})
const _refs = {
  input: ref()
}

const { hasPrefixIcon, hasPrefix, hasSuffixIcon, hasSuffix } = useState(_props)

const {
  isFocus,
  compositionstartHandler,
  compositionendHandler,
  valueIsValid,
  inputHandler,
  focusHandler,
  blurHandler
} = useEvent(_props, emit)

useAutoFocus(_props, _refs.input)

const { isCanClear, hanlderClear, mouseenterHandler, mouseleaveHandler } = useClearable(
  _props,
  emit
)

const binds = computed(() => {
  const attrs: Record<string, any> = {}
  const listeners: Record<string, any> = {}
  // 透传的 attribute 声明过的 props 或是针对 emits 声明事件的 v-on 侦听函数
  // https://cn.vuejs.org/guide/components/attrs.html#nested-component-inheritance
  Object.entries(useAttrs()).forEach(([key, value]) => {
    /^on\w+/.test(key) ? (listeners[key] = value) : (attrs[key] = value)
  })

  return {
    attrs,
    listeners
  }
})

watch(
  () => props.modelValue,
  function (value = "", oldValue = "") {
    // 值是否可用
    let _value = valueIsValid(value) ? value : valueIsValid(oldValue) ? oldValue : ""

    // 初始值是否超出最大长度
    if (props.maxlength && _value.length > props.maxlength) {
      _value = _value.slice(0, props.maxlength)
    }

    if (_value !== value) {
      emit("update:modelValue", _value)
    }
  },
  { immediate: true }
)
</script>

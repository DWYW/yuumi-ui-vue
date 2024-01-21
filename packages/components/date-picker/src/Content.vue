<template>
  <div :class="ns.e('icon')">
    <YuumiIcon icon="line-calendar" />
  </div>

  <div :class="ns.e('content')">
    <span v-if="startValueText">{{ startValueText }}</span>
    <span v-else-if="!state.isRange" :class="ns.e('placeholder')">{{ rootProps.placeholder }}</span>
    <span v-else :class="ns.e('placeholder')">{{ rootProps.startPlaceholder }}</span>

    <template v-if="state.isRange">
      <span :class="ns.e('hyphen')">{{ rootProps.hyphen }}</span>

      <span v-if="endValueText">{{ endValueText }}</span>
      <span v-else :class="ns.e('placeholder')">{{ rootProps.endPlaceholder }}</span>
    </template>
  </div>

  <div :class="ns.e('icon')">
    <YuumiIcon v-if="state.isCanClear" icon="line-circle-close" @click.stop="$emit('clear')" />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getValueByPath, dateFormatter } from "../../../share/helper"
import { formatProvideKey, propsProvideKey, stateProvideKey } from "./provide"
import type { ComputedRef } from "vue"
import type { DatePickerProps } from "./props"
import type { DatePickerState } from "./useState"
import type { DatePickerFormat } from "./useFormat"

defineEmits({
  clear: null
})

const ns = useNameSpace("datepicker")
const rootProps = inject<ComputedRef<DatePickerProps>>(propsProvideKey)!
const state = inject<ComputedRef<DatePickerState>>(stateProvideKey)!
const { format } = inject<DatePickerFormat>(formatProvideKey)!

const startValueText = computed(() => {
  const value = state.value.isRange
    ? getValueByPath(rootProps.value, "modelValue[0]")
    : rootProps.value.modelValue
  if (!(value instanceof Date)) return ""
  return dateFormatter(value, format.value)
})
const endValueText = computed(() => {
  const value = getValueByPath(rootProps.value, "modelValue[1]")
  if (!(value instanceof Date)) return ""
  return dateFormatter(value, format.value)
})
</script>

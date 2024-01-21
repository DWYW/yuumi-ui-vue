<template>
  <div :class="ns.e('icon')">
    <YuumiIcon icon="line-clock" />
  </div>

  <div :class="ns.e('content')">
    <span v-if="startValueText">{{ startValueText }}</span>
    <span v-else-if="!rootProps.range" :class="ns.e('placeholder')">{{
      rootProps.placeholder
    }}</span>
    <span v-else :class="ns.e('placeholder')">{{ rootProps.startPlaceholder }}</span>

    <template v-if="rootProps.range">
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
import { propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import type { ComputedRef } from "vue"
import type { TimePickerSelection } from "./useSelection"
import type { TimePickerProps } from "./props"
import type { TimePickerState } from "./useState"

defineEmits({
  clear: null
})
const ns = useNameSpace("timepicker")
const rootProps = inject<ComputedRef<TimePickerProps>>(propsProvideKey)!
const { startValue, endValue, valueStringfy } = inject<TimePickerSelection>(selectionProvideKey)!
const state = inject<ComputedRef<TimePickerState>>(stateProvideKey)!

const startValueText = computed(() => valueStringfy(startValue.value, rootProps.value.format))
const endValueText = computed(() => valueStringfy(endValue.value, rootProps.value.format))
</script>

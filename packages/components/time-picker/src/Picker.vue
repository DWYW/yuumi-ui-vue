<template>
  <div :class="ns.e('picker')">
    <div :class="ns.eb('picker', 'start')">
      <template v-for="(item, index) in stratTimes" :key="index">
        <TimeComponent
          v-if="item"
          :values="item"
          :model-value="startValue[index]"
          @select="selectHandler(index, $event, false)"
        />
      </template>
    </div>

    <div v-if="rootProps.range" :class="ns.eb('picker', 'end')">
      <template v-for="(item, index) in endTimes" :key="index">
        <TimeComponent
          v-if="item"
          :values="item"
          :model-value="endValue[index]"
          @select="selectHandler(index, $event, true)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, computed, inject, onMounted } from "vue"
import { createRange } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { propsProvideKey, selectionProvideKey } from "./provide"
import type { TimePickerProps } from "./props"
import type { TimePickerSelection } from "./useSelection"
import TimeComponent, { type ValueItem } from "./Time.vue"

const ns = useNameSpace("timepicker")
const rootProps = inject<ComputedRef<TimePickerProps>>(propsProvideKey)!
const { startValue, endValue, itemSelected } = inject<TimePickerSelection>(selectionProvideKey)!

const isVisibleHours = computed(() => /h/.test(rootProps.value.format))
const isVisibleMinutes = computed(() => /m/.test(rootProps.value.format))
const isVisibleSeconds = computed(() => /s/.test(rootProps.value.format))
const num2str = (value: number) => `0${value}`.slice(-2)

onMounted(() => {
  const now = new Date()
  const values = [
    isVisibleHours.value ? now.getHours() : NaN,
    isVisibleMinutes.value ? now.getMinutes() : NaN,
    isVisibleSeconds.value ? now.getSeconds() : NaN
  ]
  startValue.value.length === 0 &&
    values.forEach((item, index) => {
      itemSelected(index, item)
    })
  endValue.value.length === 0 &&
    values.forEach((item, index) => {
      itemSelected(index, item, true)
    })
})

const getDisabledHours = (isEnd?: boolean) => {
  const _value = isEnd ? endValue.value : startValue.value
  return typeof rootProps.value.disabledHours === "function"
    ? rootProps.value.disabledHours(..._value)
    : []
}

const getDisabledMinutes = (isEnd?: boolean) => {
  const _value = isEnd ? endValue.value : startValue.value
  return typeof rootProps.value.disabledMinutes === "function"
    ? rootProps.value.disabledMinutes(..._value)
    : []
}

const getDisabledSeconds = (isEnd?: boolean) => {
  const _value = isEnd ? endValue.value : startValue.value
  return typeof rootProps.value.disabledSeconds === "function"
    ? rootProps.value.disabledSeconds(..._value)
    : []
}

const stratTimes = computed(() => {
  const res: (ValueItem[] | null)[] = [null, null, null]
  if (isVisibleHours.value) {
    const disabledHours = new Set(getDisabledHours())
    res[0] = createRange(0, 23).map(value => {
      return { label: num2str(value), value, disabled: disabledHours.has(value) }
    })
  }

  if (isVisibleMinutes.value) {
    const disabledMinutes = new Set(getDisabledMinutes())
    res[1] = createRange(0, 59).map(value => {
      return { label: num2str(value), value, disabled: disabledMinutes.has(value) }
    })
  }

  if (isVisibleSeconds.value) {
    const disabledSeconds = new Set(getDisabledSeconds())
    res[2] = createRange(0, 59).map(value => {
      return { label: num2str(value), value, disabled: disabledSeconds.has(value) }
    })
  }

  return res
})

const endTimes = computed(() => {
  const res: (ValueItem[] | null)[] = [null, null, null]
  if (!rootProps.value.range) return res

  if (isVisibleHours.value) {
    const defDisabled = createRange(0, startValue.value[0] - 1)
    const disabledHours = new Set(getDisabledHours(true).concat(defDisabled))
    res[0] = createRange(0, 23).map(value => {
      return { label: num2str(value), value, disabled: disabledHours.has(value) }
    })
  }

  if (isVisibleMinutes.value) {
    const defDisabled =
      startValue.value[0] === endValue.value[0] ? createRange(0, startValue.value[1] - 1) : []
    const disabledMinutes = new Set(getDisabledMinutes(true).concat(defDisabled))
    res[1] = createRange(0, 59).map(value => {
      return { label: num2str(value), value, disabled: disabledMinutes.has(value) }
    })
  }

  if (isVisibleSeconds.value) {
    const defDisabled =
      startValue.value[0] === endValue.value[0] && startValue.value[1] === endValue.value[1]
        ? createRange(0, startValue.value[2] - 1)
        : []
    const disabledSeconds = new Set(getDisabledSeconds(true).concat(defDisabled))
    res[2] = createRange(0, 59).map(value => {
      return { label: num2str(value), value, disabled: disabledSeconds.has(value) }
    })
  }

  return res
})
/**
 * @param index item index
 * @param value item selected value
 * @param isEnd is end picker
 */
function selectHandler(index: number, value: number, isEnd: boolean) {
  itemSelected(index, value, isEnd)
}
</script>

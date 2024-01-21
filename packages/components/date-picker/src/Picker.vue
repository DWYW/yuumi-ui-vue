<template>
  <div :class="ns.e('picker')">
    <div v-if="state.hasTime" :class="ns.e('time')">
      <span :class="ns.is(ns.e('placeholder'), !startDate)">
        <template v-if="startDate">{{ startDate }}</template>
        <template v-else-if="state.isRange">{{ rootProps.startPlaceholder }}</template>
        <template v-else>{{ rootProps.placeholder }}</template>
      </span>

      <YuumiTimePicker
        v-model="startTime"
        immediate
        :placeholder="state.isRange ? rootProps.startTimePlaceholder : rootProps.timePlaceholder"
        :disabled="startTimeDisabled"
        :disabled-hours="startDisabledHours"
        :disabled-minutes="startDisabledMinutes"
        :disabled-seconds="startDisabledSeconds"
      />

      <template v-if="state.isRange">
        <YuumiIcon icon="line-arrow-right" />

        <span :class="ns.is(ns.e('placeholder'), !endDate)">
          <template v-if="endDate">{{ endDate }}</template>
          <template v-else>{{ rootProps.endPlaceholder }}</template>
        </span>

        <YuumiTimePicker
          v-model="endTime"
          immediate
          :placeholder="rootProps.endTimePlaceholder"
          :disabled="endTimeDisabled"
          :disabled-hours="endDisabledHours"
          :disabled-minutes="endDisabledMinutes"
          :disabled-seconds="endDisabledSeconds"
        />
      </template>
    </div>

    <div :class="ns.eb('picker', 'start')">
      <div :class="ns.eb('picker', 'header')">
        <YuumiIcon icon="line-prev" @click="updateYearHandler(-1)" />
        <YuumiIcon icon="line-arrow-left" @click="updateMonthHandler(-1)" />
        <YuumiIcon v-if="!state.isRange" icon="line-next" @click="updateYearHandler(1)" />
        <YuumiIcon v-if="!state.isRange" icon="line-arrow-right" @click="updateMonthHandler(1)" />
        <div :class="ns.eb('picker', 'header-content')">
          <span :class="ns.eb('picker', 'header-year')">{{ startMonthData.year }}</span>
          <span :class="ns.eb('picker', 'header-month')">{{ startMonthData.monthText }}</span>
        </div>
      </div>

      <DateComponent
        :dates="startMonthData.dates"
        @item-enter="itemEnterHandler"
        @item-select="itemSelectHandler"
      />
    </div>

    <div v-if="endMonthData" :class="ns.eb('picker', 'end')">
      <div :class="ns.eb('picker', 'header')">
        <YuumiIcon icon="line-next" @click="updateYearHandler(1)" />
        <YuumiIcon icon="line-arrow-right" @click="updateMonthHandler(1)" />

        <div :class="ns.eb('picker', 'header-content')">
          <span :class="ns.eb('picker', 'header-year')">{{ endMonthData.year }}</span>
          <span :class="ns.eb('picker', 'header-month')">{{ endMonthData.monthText }}</span>
        </div>
      </div>

      <DateComponent
        :dates="endMonthData.dates"
        @item-enter="itemEnterHandler"
        @item-select="itemSelectHandler"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { dateFormatter, dateParse, getValueByPath, timeParse } from "../../../share/helper"
import { formatProvideKey, propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import {
  dateMerge,
  getDateZeroTime,
  getDisabledHours,
  getDisabledMinutes,
  getDisabledSeconds,
  getMonthDates
} from "./helper"
import type { ComputedRef } from "vue"
import type { DatePickerProps } from "./props"
import type { DatePickerState } from "./useState"
import type { DatePickerSelection } from "./useSelection"
import type { DatePickerFormat } from "./useFormat"
import DateComponent, { type DateItem } from "./Date.vue"

const emit = defineEmits(["update:errMsg"])
const ns = useNameSpace("datepicker")
const rootProps = inject<ComputedRef<DatePickerProps>>(propsProvideKey)!
const state = inject<ComputedRef<DatePickerState>>(stateProvideKey)!
const {
  startValue,
  endValue,
  updateSelected,
  clear: clearSelected
} = inject<DatePickerSelection>(selectionProvideKey)!
const wantStartStamp = ref(getDateZeroTime(startValue.value))
const wantEndStamp = ref(getDateZeroTime(endValue.value))

function getRenderDate() {
  let value = state.value.isRange
    ? getValueByPath<Date>(rootProps.value, "modelValue[0]")
    : rootProps.value.modelValue
  if (!(value instanceof Date)) {
    value = new Date()
  }
  return value
}
const renderDate = ref(getRenderDate())
const startMonthData = computed(() => {
  const { year, month } = dateParse(renderDate.value)
  return createMonthData(year, month)
})
const endMonthData = computed(() => {
  if (!state.value.isRange) return
  const { year, month } = dateParse(renderDate.value)
  return createMonthData(year, month + 1)
})

function createMonthData(year: number, month: number) {
  year += Math.floor(month / 12)
  month = month % 12

  const startStamp = Math.min(wantStartStamp.value, wantEndStamp.value)
  const endStamp = Math.max(wantStartStamp.value, wantEndStamp.value)
  return {
    year,
    month,
    monthText: `0${month + 1}`.slice(-2),
    dates: getMonthDates(year, month).map(item => {
      const itemZeroStamp = item.value.getTime()
      item.isDisabled =
        typeof rootProps.value.disabledDates === "function" &&
        rootProps.value.disabledDates(item.value)

      if (state.value.isRange) {
        item.isInRange =
          item.isCurrentMonth &&
          startStamp &&
          endStamp &&
          itemZeroStamp >= startStamp &&
          itemZeroStamp <= endStamp
        item.isRangeStart = item.isCurrentMonth && startStamp === itemZeroStamp
        item.isRangeEnd = item.isCurrentMonth && endStamp === itemZeroStamp
      } else {
        item.isSelected = getDateZeroTime(startValue.value) === itemZeroStamp
      }
      return item
    }) as DateItem[]
  }
}

let prevEndDate = ""
function itemSelectHandler(item: DateItem) {
  if (!state.value.isRange) {
    const value = state.value.hasTime
      ? dateMerge(new Date(item.stamp), startValue.value)
      : new Date(item.stamp)
    updateSelected(value, false)
    if (item.isNextMonth || item.isPrevMonth) {
      renderDate.value = new Date(item.stamp)
    }
  } else if (!startValue.value || endValue.value) {
    const value = dateMerge(new Date(item.stamp), startValue.value)
    if (endValue.value) {
      prevEndDate = endValue.value.toString()
    }
    wantStartStamp.value = item.stamp
    wantEndStamp.value = 0
    clearSelected()
    updateSelected(value, false)
  } else {
    const { maxdays, masdaysErrMsg } = rootProps.value
    if (maxdays && Math.abs(item.stamp - wantStartStamp.value) > maxdays * 24 * 3600 * 1000) {
      emit("update:errMsg", masdaysErrMsg.replace("{maxdays}", maxdays.toString()))
      return
    }
    emit("update:errMsg", "")

    wantEndStamp.value = item.stamp
    if (wantEndStamp.value < wantStartStamp.value) {
      const start = dateMerge(new Date(wantEndStamp.value), startValue.value)
      const end = dateMerge(
        new Date(wantStartStamp.value),
        prevEndDate ? new Date(prevEndDate) : undefined
      )
      updateSelected(start, false)
      updateSelected(end, true)
    } else {
      const end = dateMerge(
        new Date(wantEndStamp.value),
        prevEndDate ? new Date(prevEndDate) : undefined
      )
      updateSelected(end, true)
    }
  }
}

function itemEnterHandler(item: DateItem) {
  if (!state.value.isRange) return
  if (!startValue.value || endValue.value) return
  wantEndStamp.value = item.stamp
}

function updateYearHandler(step: 1 | -1) {
  const { year, month, date } = dateParse(renderDate.value)
  renderDate.value = new Date(year + step, month, date, 0, 0, 0)
}

function updateMonthHandler(step: 1 | -1) {
  const { year, month, date } = dateParse(renderDate.value)
  renderDate.value = new Date(year, month + step, date, 0, 0, 0)
}

/** ----- 处理时间相关操作 ----- */
const { dateFormat, timeFormat } = inject<DatePickerFormat>(formatProvideKey)!
const startTimeDisabled = computed(() => !startValue.value)
const startTime = computed({
  get() {
    if (!startValue.value) return ""
    return dateFormatter(startValue.value, timeFormat.value)
  },
  set(value: string) {
    const times = timeParse(value, timeFormat.value)
    const { year, month, date } = dateParse(startValue.value!)
    updateSelected(new Date(year, month, date, ...times))

    if (endValue.value && endValue.value.getTime() < startValue.value!.getTime()) {
      endTime.value = startTime.value
    }
  }
})
const startDate = computed(() => {
  if (!startValue.value) return ""
  return dateFormatter(startValue.value, dateFormat.value)
})
const startDisabledHours = () => getDisabledHours(rootProps.value.disabledHours, startValue.value)
const startDisabledMinutes = () =>
  getDisabledMinutes(rootProps.value.disabledMinutes, startValue.value)
const startDisabledSeconds = () =>
  getDisabledSeconds(rootProps.value.disabledSeconds, startValue.value)

const endTimeDisabled = computed(() => !endValue.value)
const endTime = computed({
  get() {
    if (!endValue.value) return ""
    return dateFormatter(endValue.value, timeFormat.value)
  },
  set(value: string) {
    const times = timeParse(value, timeFormat.value)
    const { year, month, date } = dateParse(endValue.value!)
    updateSelected(new Date(year, month, date, ...times), true)
  }
})
const endDate = computed(() => {
  if (!endValue.value) return ""
  return dateFormatter(endValue.value, dateFormat.value)
})
const endDisabledHours = () =>
  getDisabledHours(rootProps.value.disabledHours, endValue.value, startValue.value)
const endDisabledMinutes = () =>
  getDisabledMinutes(rootProps.value.disabledMinutes, endValue.value, startValue.value)
const endDisabledSeconds = () =>
  getDisabledSeconds(rootProps.value.disabledSeconds, endValue.value, startValue.value)
</script>

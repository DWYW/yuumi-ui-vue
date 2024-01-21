<template>
  <div :class="ns.e('dates')">
    <div :class="ns.eb('dates', 'header')">
      <div v-for="week in weeks" :key="week" :class="ns.eb('date', 'item')">
        <div :class="ns.eb('date-item', 'content')">
          {{ week }}
        </div>
      </div>
    </div>
    <div :class="ns.eb('dates', 'body')">
      <div
        v-for="item in dates"
        :key="item.stamp"
        :class="[
          ns.eb('date', 'item'),
          ns.is('_prev', item.isPrevMonth),
          ns.is('_next', item.isNextMonth),
          ns.is('_selected', item.isSelected),
          ns.is('_range', item.isInRange),
          ns.is('_range-start', item.isRangeStart),
          ns.is('_range-end', item.isRangeEnd),
          ns.is('_disabled', item.isDisabled)
        ]"
        @click="clickHandler(item)"
        @mouseenter="mouseenterHandler(item)"
      >
        <div :class="ns.eb('date-item', 'content')">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../../share/useApi"
import type { PropType } from "vue"

export interface DateItem {
  label: string
  value: Date
  stamp: number
  isDisabled: boolean
  isPrevMonth: boolean
  isNextMonth: boolean
  isSelected?: boolean
  isInRange?: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
}

defineProps({
  dates: Array as PropType<DateItem[]>
})
const emit = defineEmits(["itemSelect", "itemEnter"])
const ns = useNameSpace("datepicker")
const weeks = ["日", "一", "二", "三", "四", "五", "六"]

function clickHandler(item: DateItem) {
  if (item.isDisabled) return
  emit("itemSelect", item)
}

function mouseenterHandler(item: DateItem) {
  if (item.isDisabled) return
  emit("itemEnter", item)
}
</script>

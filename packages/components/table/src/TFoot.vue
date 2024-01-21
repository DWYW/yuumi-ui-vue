<template>
  <div :ref="_refs.tfoot" :class="[ns.e('foot')]">
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="{
        tableLayout: isScrollX || isScrollY ? 'fixed' : 'auto'
      }"
    >
      <colgroup>
        <col v-for="col in columns" :key="col.props.prop" :width="col.props.width" />
        <col v-if="isScrollY" :width="verticalBarWidth" />
      </colgroup>

      <thead>
        <tr>
          <td
            v-for="(col, index) in columns"
            :key="col.props.prop"
            :class="[
              ns.is('sticky-left', isScrollX && /left/.test(col.props.fixed)),
              ns.is('sticky-right', isScrollX && /right/.test(col.props.fixed)),
              ns.is('sticky-first', isScrollX && stickyPositions[index]?.isFirst),
              ns.is('sticky-last', isScrollX && stickyPositions[index]?.isLast)
            ]"
            :style="getColStyle(col.props, index)"
          >
            <div :class="[ns.e('cell'), ns.em('cell', col.props.align)]">
              <component
                :is="columnsVNode[index].children.footer"
                v-if="isHasFooterSlot(index)"
                :props="col.props"
                :value="sum[index]"
              />
              <span v-else>{{ sum[index] }}</span>
            </div>
          </td>

          <td
            v-if="isScrollY"
            :class="[ns.e('scrollbar')]"
            :style="{
              position: isScrollX ? 'sticky' : 'static',
              right: 0
            }"
          />
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getValueByPath } from "../../../share/helper"
import {
  columnsProvideKey,
  propsProvideKey,
  refsProvideKey,
  scrollStateProvideKey,
  stickyPositionsProvideKey
} from "./provide"
import { useHelper } from "./useHelper"
import type { ComputedRef, Ref } from "vue"
import type { ScrollState } from "./useScrollState"
import type { SticyPosition } from "./useHelper"
import type { TableProps } from "./props"

defineOptions({ name: "YuumiTableFoot" })
const ns = useNameSpace("table")
const { getColumnProps } = useHelper()
const _refs = inject<{ [x: string]: Ref<HTMLElement> }>(refsProvideKey)!
const rootProps = inject<ComputedRef<TableProps>>(propsProvideKey)!
const columnsVNode = inject<ComputedRef<any[]>>(columnsProvideKey)!
const columns = computed(() =>
  columnsVNode.value.map(column => {
    return {
      props: getColumnProps(column)
    }
  })
)
const { isScrollX, isScrollY, verticalBarWidth } = inject<ScrollState>(scrollStateProvideKey)!
const stickyPositions = inject<ComputedRef<Array<SticyPosition | null>>>(stickyPositionsProvideKey)!

function isHasFooterSlot(index: number): boolean {
  const _slot = getValueByPath(columnsVNode.value[index], `children.footer`)
  return typeof _slot === "function"
}

function getColStyle(props: any, index: number) {
  const position = stickyPositions.value[index]
  if (!position) return

  const res = {
    left: /left/.test(props.fixed) ? `${position.left}px` : "",
    right: /right/.test(props.fixed) ? `${position.right! + verticalBarWidth.value}px` : ""
  }
  return res
}

const sum = computed(() => {
  const { data, summaryText, summaryMethod } = rootProps.value
  const option = { data, columns: columns.value, summaryText: summaryText }
  return typeof summaryMethod === "function" ? summaryMethod(option) : defaultSummaryMethod(option)
})

interface SummaryMethodOptions {
  data: any[]
  columns: any[]
  summaryText: string
}

function defaultSummaryMethod({ data, columns, summaryText }: SummaryMethodOptions) {
  const sum = Array(columns.length).fill(0)
  let sumStartIndex = -1

  data.forEach(row => {
    columns.forEach((column, index) => {
      if (sumStartIndex < 0) {
        sumStartIndex = index
        sum[index] = summaryText
      }

      if (typeof sum[index] !== "number" || index === sumStartIndex) return

      const itemValue = Number(getValueByPath(row, column.props.prop))
      if (itemValue.toString() === "NaN") {
        sum[index] = "N/A"
        return
      }

      sum[index] += itemValue
    })
  })

  return sum
}
</script>

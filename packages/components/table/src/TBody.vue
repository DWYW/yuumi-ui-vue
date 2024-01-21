<template>
  <div :ref="_refs.tbody" :class="[ns.e('body')]">
    <table cellspacing="0" cellpadding="0" :style="{ minWidth: `${staticWidth}px` }">
      <colgroup>
        <col v-for="col in columns" :key="col.props.prop" :width="col.props.width" />
      </colgroup>

      <tbody>
        <tr v-if="rootProps.data.length === 0">
          <td :class="[ns.e('empty')]" :colspan="columns.length">
            <YuumiEmpty :description="rootProps.emptyPlaceholder" />
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="(row, rowIndex) in rootProps.data"
            :key="row.id"
            :class="[
              typeof rootProps.rowClassName === 'function' &&
                rootProps.rowClassName({ row, rowIndex })
            ]"
          >
            <td
              v-for="(col, colIndex) in columns"
              :key="col.props.prop"
              :class="[
                typeof rootProps.cellClassName === 'function' &&
                  rootProps.cellClassName({ col, colIndex, row, rowIndex }),
                ns.is('sticky-left', isScrollX && /left/.test(col.props.fixed)),
                ns.is('sticky-right', isScrollX && /right/.test(col.props.fixed)),
                ns.is('sticky-first', isScrollX && stickyPositions[colIndex]?.isFirst),
                ns.is('sticky-last', isScrollX && stickyPositions[colIndex]?.isLast)
              ]"
              :style="getColStyle(col.props, colIndex)"
            >
              <component
                :is="columnsVNode[colIndex]"
                :row-index="rowIndex"
                :col-index="colIndex"
                :data="row"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue"
import { useNameSpace } from "../../../share/useApi"
import {
  columnsProvideKey,
  propsProvideKey,
  refsProvideKey,
  scrollStateProvideKey,
  stickyPositionsProvideKey
} from "./provide"
import { useHelper } from "./useHelper"
import type { ComputedRef, Ref } from "vue"
import type { TableProps } from "./props"
import type { ScrollState } from "./useScrollState"
import type { SticyPosition } from "./useHelper"

defineOptions({ name: "YuumiTableBody" })
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
const staticWidth = computed(() => {
  return columns.value.reduce((acc, col) => acc + col.props.width, 0)
})

const { isScrollX } = inject<ScrollState>(scrollStateProvideKey)!
const stickyPositions = inject<ComputedRef<Array<SticyPosition | null>>>(stickyPositionsProvideKey)!

function getColStyle(props: any, index: number) {
  const position = stickyPositions.value[index]
  if (!position) return
  const res = {
    left: /left/.test(props.fixed) ? `${position.left}px` : "",
    right: /right/.test(props.fixed) ? `${position.right}px` : ""
  }
  return res
}
</script>

<template>
  <div :ref="_refs.thead" :class="[ns.e('head')]">
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
          <th
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
            <div
              :class="[ns.e('cell'), ns.em('cell', col.props.align)]"
              :style="{
                fontSize: col.props.type ? '0px' : undefined
              }"
            >
              <YuumiCheckbox
                v-if="col.props.type === 'selection'"
                v-model="checked"
                :indeterminate="indeterminate"
                :unique="-1"
                :style="{ height: 'inherit' }"
                @change="selectionChanged"
              />

              <component
                :is="columnsVNode[index].children.header"
                v-else-if="isHasHeaderSlot(index)"
                :props="col.props"
              />

              <span v-else>{{ col.props.title || col.props.placeholder }}</span>
            </div>
          </th>

          <th
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
import { computed, inject, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getValueByPath } from "../../../share/helper"
import {
  columnsProvideKey,
  refsProvideKey,
  scrollStateProvideKey,
  selectionProvideKey,
  stickyPositionsProvideKey
} from "./provide"
import { useHelper } from "./useHelper"
import type { ComputedRef, Ref } from "vue"
import type { ScrollState } from "./useScrollState"
import type { SticyPosition } from "./useHelper"
import type { TableSelection } from "./useSelection"

defineOptions({ name: "YuumiTableHead" })
const ns = useNameSpace("table")
const { getColumnProps } = useHelper()
const _refs = inject<{ [x: string]: Ref<HTMLElement> }>(refsProvideKey)!
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

function getColStyle(col: any, index: number) {
  const position = stickyPositions.value[index]
  if (!position) return

  const res = {
    left: /left/.test(col.fixed) ? `${position.left}px` : "",
    right: /right/.test(col.fixed) ? `${position.right! + verticalBarWidth.value}px` : ""
  }
  return res
}

function isHasHeaderSlot(index: number): boolean {
  const _slot = getValueByPath(columnsVNode.value[index], `children.header`)
  return typeof _slot === "function"
}

const { selectionValue, selectionChanged } = inject<TableSelection>(selectionProvideKey)!
const checked = ref(false)
const indeterminate = computed(() => selectionValue.value === 0)
watch(
  selectionValue,
  (value, oldValue) => {
    if (value === oldValue) return

    const _checked = selectionValue.value === 1
    if (_checked !== checked.value) {
      checked.value = _checked
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    :ref="_refs.el"
    :class="[
      ns.n(),
      ns.m(size),
      ns.is(ns.m('border'), border),
      ns.is(ns.m('stripe'), stripe),
      ns.is(ns.m('scroll-start'), isScrollStart),
      ns.is(ns.m('scroll-end'), isScrollEnd)
    ]"
  >
    <THeadComponent />
    <TBodyComponent @scroll="scrollHandler" />
    <TFootComponent v-if="summary" />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, computed, onMounted, onUnmounted, watch, nextTick } from "vue"
import { debounce } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { type TableProps, tableProps } from "./props"
import { tableEmits } from "./emits"
import {
  columnsProvideKey,
  propsProvideKey,
  refsProvideKey,
  scrollStateProvideKey,
  selectionProvideKey,
  stickyPositionsProvideKey
} from "./provide"
import { useHelper } from "./useHelper"
import { useResize } from "./useResize"
import { useScrollState } from "./useScrollState"
import { useSelection } from "./useSelection"
import THeadComponent from "./THead.vue"
import TBodyComponent from "./TBody.vue"
import TFootComponent from "./TFoot.vue"

defineOptions({ name: "YuumiTable" })
const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)
const ns = useNameSpace("table")
const { getColumnsFromSlot, getColumnStickyPositions } = useHelper()

const _refs = {
  el: ref(),
  thead: ref(),
  tbody: ref(),
  tfoot: ref()
}
provide(refsProvideKey, _refs)
const _props = computed<TableProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)
const columns = computed(() => getColumnsFromSlot())
provide(columnsProvideKey, columns)
const stickyPositions = computed(() => getColumnStickyPositions(columns.value))
provide(stickyPositionsProvideKey, stickyPositions)
const selection = useSelection(_props, emit)
provide(selectionProvideKey, selection)

const { updateTableCellSize, updateTableWidth, updateTableWrapperSize } = useResize(
  _refs.el,
  _refs.thead,
  _refs.tbody,
  _refs.tfoot
)

const scrollState = useScrollState()
const { isScrollStart, isScrollEnd, isScrollY, verticalBarWidth } = scrollState
provide(scrollStateProvideKey, scrollState)

function updateSizes() {
  updateTableCellSize()
  updateTableWidth()
  updateTableWrapperSize()
  nextTick(() => {
    scrollState.reset(_refs.tbody.value)

    // 如果有垂直方向的滚动条
    const scrollbarSize = props.border ? verticalBarWidth.value : verticalBarWidth.value
    if (isScrollY.value) {
      updateTableWidth(scrollbarSize)
    }
  })
}

defineExpose({
  selections: selection.selections,
  toggleRowsSelection: selection.toggleRowsSelection,
  clearSelection: selection.clearSelection
})

watch(
  () => props.data,
  () => {
    nextTick(updateSizes)
  },
  { immediate: true }
)

watch(
  () => columns.value,
  () => {
    nextTick(updateSizes)
  }
)

const onResize = debounce(updateSizes, 16)

onMounted(() => {
  window.addEventListener("resize", onResize, false)
})

onUnmounted(() => {
  window.removeEventListener("resize", onResize, false)
})

function scrollHandler(e: Event) {
  const target = e.target as HTMLElement
  scrollState.update(target)

  if (_refs.thead.value) {
    _refs.thead.value.scrollLeft = target.scrollLeft
  }

  if (_refs.tfoot.value) {
    _refs.tfoot.value.scrollLeft = target.scrollLeft
  }

  emit("scroll", e)
}
</script>

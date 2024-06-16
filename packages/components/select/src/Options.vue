<template>
  <YuumiScrollbar
    :ref="_refs.scrollbar"
    :style="{ minWidth }"
    :dynamic="rootProps.filterable"
    @init="initHandler"
  >
    <ul :ref="_refs.options" :class="[ns.e('options'), ns.m(rootProps.theme)]">
      <li
        v-for="option in options"
        :key="getValue(option)"
        :class="[ns.eb('options', 'item'), ns.is('_selected', optionIsSelected(option))]"
        @click="clickHandler(option)"
      >
        <span>{{ getLabel(option) }}</span>
        <YuumiIcon icon="line-correct" />
      </li>

      <li v-if="state.isLoadingRemoteData" :class="ns.em('options', 'placeholder')">
        {{ rootProps.optionsLoaderPlaceholder }}
      </li>
      <li v-else-if="!options.length" :class="ns.em('options', 'placeholder')">
        {{ rootProps.optionsEmptyPlaceholder }}
      </li>
    </ul>
  </YuumiScrollbar>
</template>

<script setup lang="ts">
import { inject, nextTick, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { useHelper } from "./useHelper"
import { optionsProvideKey, propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import type { ComputedRef, Ref } from "vue"
import type { SelectProps } from "./props"
import type { SelectSelection } from "./useSelection"
import type { SelectState } from "./useState"
import { YuumiIcon } from "../../icon"
import { YuumiScrollbar } from "../../scrollbar"

defineOptions({ name: "YuumiSelectOptions" })
defineProps({
  minWidth: String
})
const emit = defineEmits(["selected"])
const ns = useNameSpace("select")
const _refs = {
  scrollbar: ref(),
  options: ref()
}

const rootProps = inject<ComputedRef<SelectProps>>(propsProvideKey)!
const state = inject<ComputedRef<SelectState>>(stateProvideKey)!
const options = inject<Ref<any[]>>(optionsProvideKey)!
const { selections, selectionAddItem, selectionDeleteItem } =
  inject<SelectSelection>(selectionProvideKey)!
const { getValue, getLabel } = useHelper(rootProps)

function optionIsSelected(option: any): boolean {
  return !!selections.value.find(item => item.value === getValue(option))
}

function clickHandler(option: any) {
  const item = { label: getLabel(option), value: getValue(option) }
  if (rootProps.value.multiple) {
    optionIsSelected(option) ? selectionDeleteItem(item) : selectionAddItem(item)
  } else {
    selectionAddItem(item)
  }

  nextTick(() => {
    emit("selected", option)
  })
}

// 下拉选项被激活，但还未加载完成
watch(
  () => state.value.isLoading || state.value.isLoadingRemoteData,
  (value, oldValue) => {
    if (oldValue && !value && state.value.isFocus) {
      initHandler()
    }
  }
)

function initHandler() {
  // 定位到选中项
  const scrollbar = _refs.scrollbar.value
  scrollbar.scrollToElement("._selected", { behavior: "smooth" })
}
</script>

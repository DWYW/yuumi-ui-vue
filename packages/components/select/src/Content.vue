<template>
  <div :class="[ns.e('content')]">
    <!-- search -->
    <template v-if="rootProps.filterable && !rootProps.multiple">
      <input
        :ref="input"
        :readonly="!state.isFocus"
        :value="keyword"
        :placeholder="keywordPlaceholder"
        @input="hanlderKeywordInput"
      />
    </template>

    <template v-else>
      <span v-if="state.isLoading" :class="ns.e('placeholder')">
        {{ rootProps.optionsLoaderPlaceholder }}
      </span>

      <span v-else-if="!selections.length" :class="ns.e('placeholder')">
        {{ rootProps.placeholder }}</span
      >

      <template v-else>
        <span v-for="item in selections" :key="item.value" :class="ns.eb('content', 'text')">
          <span>{{ item.label }}</span>

          <YuumiIcon
            v-if="rootProps.multiple && !rootProps.readonly && !rootProps.disabled"
            icon="flat-circle-close"
            @click.stop="removeSelectedItemHandler(item)"
          />
        </span>
      </template>
    </template>
  </div>

  <div :class="ns.e('icon')">
    <YuumiIcon v-if="state.isLoading" icon="line-loading" :class="ns.em('icon', 'loading')" />
    <YuumiIcon
      v-else-if="state.isCanClear"
      icon="line-circle-close"
      :class="ns.em('icon', 'clear')"
      @click.stop="clearHandler"
    />
    <YuumiIcon v-else icon="flat-arrow-bottom" :class="ns.em('icon', 'default')" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import {
  filterableProvideKey,
  propsProvideKey,
  selectionProvideKey,
  stateProvideKey
} from "./provide"
import type { ComputedRef } from "vue"
import type { SelectState } from "./useState"
import type { SelectProps } from "./props"
import type { SelectSelection, SelectionItem } from "./useSelection"
import type { SelectFilterable } from "./useFilterable"

defineOptions({ name: "YuumiSelectContent" })
const emit = defineEmits(["itemDeleted", "clear"])
const ns = useNameSpace("select")
const state = inject<ComputedRef<SelectState>>(stateProvideKey)!
const rootProps = inject<ComputedRef<SelectProps>>(propsProvideKey)!
const { selections, selectionDeleteItem, clearSelections } =
  inject<SelectSelection>(selectionProvideKey)!

const { input, keyword, hanlderKeywordInput, setKeywordInputFocus, setKeywordValue } =
  inject<SelectFilterable>(filterableProvideKey)!

const keywordPlaceholder = computed(() => {
  if (selections.value.length) return selections.value[0].label
  return rootProps.value.placeholder
})

watch(
  () => state.value.isFocus,
  value => {
    if (value) {
      rootProps.value.filterable && nextTick(setKeywordInputFocus)
    } else {
      rootProps.value.filterable && setKeywordValue(selections.value[0]?.label)
    }
  }
)

function removeSelectedItemHandler(item: SelectionItem) {
  selectionDeleteItem(item)
  emit("itemDeleted")
}

function clearHandler() {
  clearSelections()
  emit("clear")
}
</script>

<template>
  <template v-if="groups.length">
    <div
      v-for="(group, index) in groups"
      :key="group.key"
      :class="[ns.eb('group', 'item'), ns.m(rootProps.theme)]"
    >
      <YuumiScrollbar
        :ref="(el: any) => (_refs.scrollbars.value[index] = el)"
        @init="initHandler(index)"
      >
        <ul :class="ns.e('options')">
          <li
            v-for="option in group.options"
            :key="getValue(option)"
            :class="[
              ns.eb('options', 'item'),
              ns.is('_disabled', getDisabled(option)),
              ns.is('_selected', selected[index] && getValue(option) === selected[index].value)
            ]"
            @click="clickHandler(option, index)"
          >
            <span> {{ getLabel(option) }}</span>

            <YuumiIcon v-if="!isLeafNode(option)" icon="line-arrow-right" />
          </li>
        </ul>
      </YuumiScrollbar>
    </div>
  </template>

  <div v-else :class="ns.e('placeholder')">
    {{ rootProps.optionsEmptyPlaceholder }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { optionsProvideKey, propsProvideKey, selectionProvideKey } from "./provide"
import type { ComputedRef, Ref } from "vue"
import type { CascaderSelection } from "./useSelection"
import type { CascaderProps } from "./props"
import { useHelper } from "./useHelper"

defineOptions({ name: "YuumiCascaderOptions" })
const emit = defineEmits(["selected"])
const ns = useNameSpace("cascader")
const rootProps = inject<ComputedRef<CascaderProps>>(propsProvideKey)!
const { selections } = inject<CascaderSelection>(selectionProvideKey)!
const options = inject<Ref<any[]>>(optionsProvideKey)!
const { getValue, getLabel, getDisabled, getChildren, isLeafNode } = useHelper(rootProps)

const _refs = {
  scrollbars: ref<any[]>([])
}

const selected = ref([...selections.value])
const groups = computed(() => {
  const res = []

  let _options = options.value
  if (_options.length) {
    res.push({ key: "root", options: _options })
  }

  for (let i = 0; i < selected.value.length; i++) {
    const value = selected.value[i].value
    const target = _options.find(option => getValue(option) === value)
    if (!target) break
    _options = getChildren(target)
    if (!_options.length) break
    res.push({ key: value, options: _options })
  }

  return res
})

function initHandler(groupIndex: number) {
  // 定位到选中项
  const scrollbar = _refs.scrollbars.value[groupIndex]
  scrollbar.scrollToElement("._selected", { behavior: "smooth" })
}

function clickHandler(option: any, groupIndex: number) {
  if (getDisabled(option)) return
  const item = {
    label: getLabel(option),
    value: getValue(option)
  }

  selected.value = selected.value.slice(0, groupIndex).concat(item)
  const isLeaf = isLeafNode(option)
  nextTick(() => {
    if (rootProps.value.every) {
      emit("selected", { selected: selected.value, isLeaf })
    } else if (isLeaf) {
      emit("selected", { selected: selected.value, isLeaf })
    }
  })
}
</script>

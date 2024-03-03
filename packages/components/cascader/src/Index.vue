<template>
  <YuumiPopper
    :ref="_refs.popper"
    :class="ns.e('popper')"
    :placement="'bottom-start'"
    :fallback-placements="['top-start']"
    :disabled="disabled || readonly"
    @beforeEnter="beforeEnterHandler"
    @beforeLeave="beforeLeaveHandler"
  >
    <template #trigger>
      <div
        :ref="_refs.el"
        :class="[
          ns.n(),
          ns.m(theme),
          ns.m(size),
          ns.is(ns.m('focus'), state.isFocus),
          ns.is(ns.m('disabled'), disabled),
          ns.is(ns.m('readonly'), readonly)
        ]"
        v-bind="$attrs"
        @mouseenter="mouseenterHandler"
        @mouseleave="mouseLeaveHandler"
      >
        <ContentComponent @clear="clearHandler" />
      </div>
    </template>
    <template #default>
      <OptionsComponent @selected="selectedHandler" />
    </template>
  </YuumiPopper>
</template>

<script setup lang="ts">
import { ref, provide, computed, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { cascaderEmits } from "./emits"
import { type CascaderProps, cascaderProps } from "./props"
import { optionsProvideKey, propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import { useState } from "./useState"
import { SelectionItem, useSelection } from "./useSelection"
import ContentComponent from "./Content.vue"
import OptionsComponent from "./Options.vue"
import { useHelper } from "./useHelper"
import { YuumiPopper } from "../../popper"

defineOptions({ name: "YuumiCascader", inheritAttrs: false })
const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const ns = useNameSpace("cascader")

const _refs = {
  popper: ref<any>(),
  el: ref<HTMLElement>()
}
const _props = computed<CascaderProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)

const { state, updateState } = useState()
provide(stateProvideKey, state)

const selection = useSelection(_props)
const { selections, clearSelections } = selection
provide(selectionProvideKey, selection)

const { getValue, getLabel, getChildren } = useHelper(_props)

// 下拉选项配置数据
const options = ref<any[]>(props.options)
provide(optionsProvideKey, options)

function getSelectionsWithModelValue(): SelectionItem[] {
  const res: SelectionItem[] = []
  const values = props.modelValue || []
  let _options: any[] = [].concat(...options.value, ...(props.fallbackOptions || []))

  for (let i = 0; i < values.length; i++) {
    const target = _options.find(option => getValue(option) === values[i])
    if (!target) break

    _options = getChildren(target)
    res.push({ label: getLabel(target), value: getValue(target) })
  }
  return res
}

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (value?.toString() === oldValue?.toString()) return
    selections.value = getSelectionsWithModelValue()
  },
  { immediate: true, deep: true }
)

function beforeEnterHandler() {
  updateState("isFocus", true)
}

function beforeLeaveHandler() {
  updateState("isFocus", false)
}

function mouseenterHandler() {
  if (props.clearable && selection.selections.value.length) {
    updateState("isCanClear", true)
  }
}

function mouseLeaveHandler() {
  updateState("isCanClear", false)
}

function clearHandler() {
  updateState("isCanClear", false)
  clearSelections()
  emit("update:modelValue", [])
  emit("clear")
}

function selectedHandler({ selected, isLeaf }: { selected: SelectionItem[]; isLeaf: boolean }) {
  if (isLeaf && _refs.popper.value) {
    _refs.popper.value.hidePopper()
  }

  const newValue = selected.map(item => item.value)
  const oldValue = selections.value.map(item => item.value)
  if (newValue.toString() === oldValue.toString()) return

  selections.value = [...selected]
  emit("update:modelValue", newValue)
  emit("change", [...selections.value])
}
</script>

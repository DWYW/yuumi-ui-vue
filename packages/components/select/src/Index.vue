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
          ns.is(ns.m('readonly'), readonly),
          ns.is(ns.m('multiple'), multiple)
        ]"
        v-bind="$attrs"
        @mouseenter="mouseenterHandler"
        @mouseleave="mouseLeaveHandler"
      >
        <ContentComponent @itemDeleted="itemDeletedHandler" @clear="clearHandler" />
      </div>
    </template>
    <template #default>
      <OptionsComponent :min-width="optionsMinWidth" @selected="selectedHandler" />
    </template>
  </YuumiPopper>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, nextTick } from "vue"
import {
  propsProvideKey,
  stateProvideKey,
  selectionProvideKey,
  optionsProvideKey,
  filterableProvideKey
} from "./provide"
import { getValueByPath } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { selectProps } from "./props"
import { selectEmits } from "./emits"
import { useFilterable } from "./useFilterable"
import { useState } from "./useState"
import { useHelper } from "./useHelper"
import { useSelection } from "./useSelection"
import ContentComponent from "./Content.vue"
import OptionsComponent from "./Options.vue"
import type { Ref } from "vue"
import type { SelectProps } from "./props"
import { YuumiPopper } from "../../popper"

defineOptions({ name: "YuumiSelect", inheritAttrs: false })
const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
defineExpose({ optionsReload, updateSelection })
const ns = useNameSpace("select")

const _props = computed<SelectProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)
const _refs = {
  popper: ref<any>(),
  el: ref<HTMLElement>()
}

const { state, updateState } = useState()
provide(stateProvideKey, state)

const { getValue, getLabel } = useHelper(_props)
/** 选中的值 */
const selection = useSelection(_props)
provide(selectionProvideKey, selection)

const optionsMinWidth = ref("")
function updateOptionsMinWidth() {
  if (!_refs.el.value) return
  optionsMinWidth.value = `${_refs.el.value.clientWidth}px`
}

/** 下拉选项 */
const options: Ref<any[]> = ref(props.options)
if (props.optionsLoader) optionsReload()

const filterable = useFilterable()
provide(filterableProvideKey, filterable)
const { keyword } = filterable

const validOptions = computed(() => {
  if (!keyword.value) return options.value

  return options.value.filter((item: any) => {
    if (typeof props.filterMethod === "function") {
      return props.filterMethod(item, keyword.value)
    }
    return new RegExp(keyword.value).test(getValueByPath<string>(item, props.optionKey.label, ""))
  })
})
provide(optionsProvideKey, validOptions)

function updateSelection() {
  const _options: any[] = [].concat(...options.value, ...(props.fallbackOptions || []))
  selection.clearSelections()

  if (props.modelValue instanceof Array) {
    props.modelValue.forEach(item => {
      const target = _options.find(option => getValue(option) === item)
      selection.selectionAddItem({ label: getLabel(target), value: getValue(target) })
    })
  } else if (props.modelValue) {
    const target = _options.find(option => getValue(option) === props.modelValue)
    if (target) {
      selection.selectionAddItem({ label: getLabel(target), value: getValue(target) })
    }
  }
}

watch(
  () => props.modelValue?.toString(),
  (value, oldValue) => {
    if (value === oldValue) return
    updateSelection()

    // 更新popper的宽度
    if (props.multiple) {
      updateOptionsMinWidth()
    }

    // 更新popper的位置
    if (props.multiple && state.value.isFocus && _refs.popper.value) {
      nextTick(() => {
        _refs.popper.value.updatePopper()
      })
    }
  },
  { deep: true, immediate: true }
)

/** events */
function beforeEnterHandler() {
  updateState("isFocus", true)
  updateOptionsMinWidth()
}

function beforeLeaveHandler() {
  updateState("isFocus", false)
}

function mouseenterHandler() {
  if (!props.multiple && props.clearable && selection.selections.value.length) {
    updateState("isCanClear", true)
  }
}

function mouseLeaveHandler() {
  updateState("isCanClear", false)
}

function selectedHandler() {
  let _modelValue = selection.selections.value.map(item => item.value)
  if (props.multiple) {
    emit("update:modelValue", _modelValue)
  } else {
    emit("update:modelValue", _modelValue[0])
  }

  nextTick(() => {
    emit("change", props.multiple ? selection.selections.value : selection.selections.value[0])
  })

  if (!props.multiple && _refs.popper.value) {
    _refs.popper.value.hidePopper()
  }
}

function itemDeletedHandler() {
  emit(
    "update:modelValue",
    selection.selections.value.map(item => item.value)
  )
  nextTick(() => {
    emit("change", selection.selections.value)
  })
}

function clearHandler() {
  updateState("isCanClear", false)
  emit("update:modelValue", undefined)
  emit("clear")
}

// 异步加载options
function optionsReload() {
  if (typeof props.optionsLoader !== "function") return
  updateState("isLoading", true)
  Promise.resolve(props.optionsLoader())
    .then(res => {
      options.value = res
      updateSelection()
    })
    .finally(() => {
      updateState("isLoading", false)
    })
}
</script>

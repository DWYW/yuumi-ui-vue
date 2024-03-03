<template>
  <div
    :class="[
      ns.n(),
      ns.m(size),
      ns.is(ns.m('checked'), isChecked),
      ns.is(ns.m('indeterminate'), indeterminate),
      ns.is(ns.m('disabled'), isDisabled)
    ]"
    v-bind="$attrs"
    @click="clickHandler"
  >
    <span :class="ns.e('icon')">
      <transition name="yuumi-checkbox">
        <YuumiIcon v-if="isChecked" v-bind="checkedIcon" />
        <YuumiIcon v-else-if="indeterminate" v-bind="indeterminateIcon" />
        <YuumiIcon v-else v-bind="uncheckedIcon" />
      </transition>
    </span>

    <span :class="ns.e('content')">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue"
import { checkboxEmits } from "./emits"
import { checkboxProps } from "./props"
import { useNameSpace } from "../../../share/useApi"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiCheckbox", inheritAttrs: false })
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const ns = useNameSpace("checkbox")
const group = inject<any>("YuumiCheckboxGroup", undefined)

const isChecked = computed(() => {
  if (group) {
    return (group.modelValue.value || []).indexOf(props.unique) > -1
  }

  return Boolean(props.modelValue)
})

const isDisabled = computed(() => {
  return group ? group.disabled.value : props.disabled
})

function clickHandler() {
  if (isDisabled.value) return
  const detail = { value: props.unique, checked: !isChecked.value }

  if (group) {
    group.updateModelValue(detail)
    group.onChange(detail)
  } else {
    emit("update:modelValue", detail.checked)
    emit("change", detail)
  }
}
</script>

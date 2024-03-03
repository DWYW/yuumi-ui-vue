<template>
  <div
    :class="[
      ns.n(),
      ns.m(size),
      ns.is(ns.m('checked'), isChecked),
      ns.is(ns.m('disabled'), isDisabled)
    ]"
    v-bind="$attrs"
    @click="clickHandler"
  >
    <span :class="ns.e('icon')">
      <transition name="yuumi-radio">
        <YuumiIcon v-if="isChecked" v-bind="checkedIcon" />
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
import { radioEmits } from "./emits"
import { radioProps } from "./props"
import { useNameSpace } from "../../../share/useApi"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiRadio", inheritAttrs: false })
const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)
const ns = useNameSpace("radio")
const group = inject<any>("YuumiRadioGroup", undefined)

const isChecked = computed(() => {
  const modelValue = group ? group.modelValue.value : props.modelValue
  return modelValue === props.unique
})

const isDisabled = computed(() => {
  return group ? group.disabled.value : props.disabled
})

function clickHandler() {
  if (isDisabled.value || isChecked.value) return
  const detail = { value: props.unique, checked: !isChecked.value }

  if (group) {
    group.updateModelValue(detail)
    group.onChange(detail)
  } else {
    emit("update:modelValue", detail.value)
    emit("change", detail)
  }
}
</script>

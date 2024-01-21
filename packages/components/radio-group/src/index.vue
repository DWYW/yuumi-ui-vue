<template>
  <div :class="[ns.n(), ns.is(ns.m('block'), block)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, provide, toRefs } from "vue"
import { useNameSpace } from "../../../share/useApi"

defineOptions({ name: "YuumiRadioGroup" })
const props = defineProps({
  modelValue: [String, Number, Boolean],
  disabled: Boolean,
  block: Boolean
})
const emit = defineEmits(["update:modelValue", "change"])
const ns = useNameSpace("radio-group")
const { disabled, modelValue } = toRefs(props)

provide("YuumiRadioGroup", {
  modelValue,
  disabled,
  updateModelValue: ({ value }: any) => {
    emit("update:modelValue", value)
  },
  onChange: (detail: any) => {
    nextTick(() => {
      emit("change", { detail, value: detail.value })
    })
  }
})
</script>

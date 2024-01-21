<template>
  <div :class="[ns.n(), ns.is(ns.m('block'), block)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PropType, nextTick, provide, toRefs } from "vue"
import { useNameSpace } from "../../../share/useApi"

defineOptions({ name: "YuumiCheckboxGroup" })
const props = defineProps({
  modelValue: Array as PropType<Array<string | number | boolean>>,
  disabled: Boolean,
  block: Boolean
})
const emit = defineEmits(["update:modelValue", "change"])
const ns = useNameSpace("checkbox-group")
const { disabled, modelValue } = toRefs(props)

provide("YuumiCheckboxGroup", {
  modelValue,
  disabled,
  updateModelValue({ value, checked }: any) {
    const items = modelValue?.value || []

    if (checked) {
      items.push(value)
    } else {
      const index = items.findIndex((item: any) => item === value)
      items.splice(index, 1)
    }

    emit("update:modelValue", items)
  },
  onChange(detail: any) {
    nextTick(() => {
      emit("change", { detail, value: detail.value })
    })
  }
})
</script>

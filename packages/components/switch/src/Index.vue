<template>
  <div
    :class="[
      ns.n(),
      ns.m(size),
      ns.is(ns.m('checked'), isChecked),
      ns.is(ns.m('readonly'), readonly),
      ns.is(ns.m('disabled'), disabled)
    ]"
    :style="{ backgroundColor: backgroundColor }"
    @click="clickHandler"
  >
    <div :class="ns.e('content')">
      <div :class="ns.eb('content', 'open')">
        <slot name="open" />
      </div>

      <div :class="ns.eb('content', 'close')">
        <slot name="close" />
      </div>
    </div>
    <div :class="ns.e('btn')" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { switchProps } from "./props"
import { switchEmits } from "./emits"

defineOptions({ name: "YuumiSwitch" })
const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const ns = useNameSpace("switch")

const isChecked = ref(Boolean(props.modelValue))
watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (value === oldValue || Boolean(value) === isChecked.value) return
    isChecked.value = Boolean(value)
  }
)

const backgroundColor = computed(() => {
  return isChecked.value ? props.openColor : props.closeColor
})

function clickHandler() {
  if (props.readonly || props.disabled) return

  isChecked.value = !isChecked.value
  emit("update:modelValue", isChecked.value)
  emit("change", isChecked.value)
}
</script>

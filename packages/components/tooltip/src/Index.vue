<template>
  <YuumiPopper type="hover" :class="[ns.e('popper'), ns.m(theme)]" :placement="placement">
    <template #trigger>
      <component :is="triggerRender" />
    </template>
    <template #default>
      <component :is="contentRender" />
    </template>
  </YuumiPopper>
</template>

<script setup lang="ts">
import { useSlots } from "vue"
import { getFirstValidNode } from "../../../share/helper"
import { useNameSpace } from "../../../share/useApi"
import { tooltipProps } from "./props"
import { YuumiPopper } from "../../popper"

defineOptions({ name: "YuumiTooltip", inheritAttrs: false })
const props = defineProps(tooltipProps)
const ns = useNameSpace("tooltip")

const slots = useSlots()
function triggerRender() {
  return getFirstValidNode(slots.default ? slots.default() : [])
}

function contentRender() {
  return slots.content ? slots.content() : props.content
}
</script>

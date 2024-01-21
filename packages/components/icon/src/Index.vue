<template>
  <span :class="[family || ns.n(), icon]" v-bind="$attrs">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { useNameSpace } from "../../../share/useApi"
import { iconProps } from "./props"

defineOptions({ name: "YuumiIcon" })
defineProps(iconProps)
const ns = useNameSpace("icon")
</script>

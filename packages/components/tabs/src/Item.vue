<template>
  <div :class="[ns.n()]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../../share/useApi"
import { tabsItemProps } from "./props"

defineOptions({ name: "YuumiTabItem" })
const ns = useNameSpace("tabs-item")
defineProps(tabsItemProps)
</script>

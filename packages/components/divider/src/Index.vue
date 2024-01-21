<template>
  <div :class="[ns.n(), ns.m(align)]">
    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../../share/useApi"
import { dividerProps } from "./props"

defineOptions({ name: "YuumiDivider" })
const ns = useNameSpace("divider")
defineProps(dividerProps)
</script>

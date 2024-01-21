<template>
  <div :class="[ns.n(), ns.m(theme)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { isValidWarningTheme } from "../../../share/validator"
import { useNameSpace } from "../../../share/useApi"

defineOptions({ name: "YuumiWarning" })
const ns = useNameSpace("warning")

defineProps({
  theme: {
    type: String,
    validator: isValidWarningTheme,
    default: "default"
  }
})
</script>

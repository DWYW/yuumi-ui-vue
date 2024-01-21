<template>
  <svg :class="ns.e('pie')">
    <circle cx="50%" cy="50%" r="40%" fill="none"></circle>
  </svg>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../share/useApi"
const ns = useNameSpace("loading")
</script>

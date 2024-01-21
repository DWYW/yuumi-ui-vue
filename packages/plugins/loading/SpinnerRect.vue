<template>
  <div :class="ns.e('rect')">
    <div v-for="item in createRange(0, 5)" :key="item" :class="ns.eb('rect', 'item')"></div>
  </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../share/useApi"
import { createRange } from "../../share/helper"
const ns = useNameSpace("loading")
</script>

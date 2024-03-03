<template>
  <div :class="ns.n()" v-bind="$attrs">
    <div :class="ns.e('image')">
      <img v-if="image" :src="image" :style="{ width: imageSize + 'px' }" alt="empty" />
      <YuumiIcon v-else icon="line-empty" :style="{ fontSize: imageSize + 'px' }" />
    </div>

    <div v-if="description" :class="ns.e('description')">
      {{ description }}
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useNameSpace } from "../../../share/useApi"
import { emptyProps } from "./props"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiEmpty" })
const ns = useNameSpace("empty")
defineProps(emptyProps)
</script>

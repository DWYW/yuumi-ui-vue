<template>
  <div :class="ns.n()" :style="{ paddingTop: paddingTop }">
    <div :class="ns.e('wrap')">
      <!-- 防止自定义样式污染布局 -->
      <div :class="ns.e('content')" v-bind="$attrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue"
import { useNameSpace } from "../../../share/useApi"

defineOptions({ name: "YuumiRatioRect", inheritAttrs: false })
const ns = useNameSpace("ratio-rect")
const props = defineProps({
  ratio: {
    type: Number,
    default: 1
  }
})

const paddingTop = computed(() => `${100 / props.ratio}%`)
</script>

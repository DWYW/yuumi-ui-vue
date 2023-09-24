<template>
  <div
    class="yuumi-ratio-rect"
    :style="{ paddingTop: paddingTop }"
  >
    <div class="rect">
      <!-- 防止自定义样式污染布局 -->
      <div
        class="rect-content"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "YuumiRatioRect",
  props: {
    ratio: { type: Number, default: 1 }
  },
  computed: {
    paddingTop(): string {
      return `${100 / this.ratio}%`
    }
  }
})
</script>

<style lang="scss">
.yuumi-ratio-rect {
  position: relative;
  width: 100%;
  overflow: hidden;

  .rect {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;

    .rect-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
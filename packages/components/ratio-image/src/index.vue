<template>
  <div
    class="yuumi-ratio-image"
    :style="{ paddingTop: paddingTop }"
  >
    <!-- 防止自定义样式污染布局 -->
    <div
      class="image"
      v-bind="$attrs"
    >
      <div
        v-if="isShowPlaceholder"
        class="placeholder__image"
        :style="placeholderImageStyle"
      />

      <div
        v-else
        class="taget__image"
        :style="imageStyle"
      >
        <img
          :src="image"
          style="width: 0; height: 0; opacity: 0;"
          @load="onLoad"
          @error="onError"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { isRatioImageMode } from '../../../share/validator'
import { useMode } from './mode-helper'

export default defineComponent({
  name: 'YuumiRatioImage',
  props: {
    ratio: { type: Number, default: 1 },
    image: { type: String },
    placeholderImage: { type: String },
    radius: { type: Number, default: 0 },
    mode: { type: String, validator: isRatioImageMode, default: 'aspectFill' }
  },
  emits: ['load', 'error'],
  setup(props, { emit }) {
    const { getModeStyle } = useMode()
    const paddingTop = computed(() => `${100 / props.ratio}%`)

    const isLoadErr = ref(false)
    function onError(e: Event) {
      isLoadErr.value = true
      emit("error", e)
    }

    function onLoad(e: Event) {
      isLoadErr.value = false
      emit("load", e)
    }

    // image改变后重置error状态，防止error之后一直显示placeholder image
    watch(() => props.image, (value, oldValue) => {
      if (value !== oldValue) {
        isLoadErr.value = false
      }
    })

    const isShowPlaceholder = computed(() => {
      return !props.image || isLoadErr.value
    })

    const baseStyle = computed(() => ({
      borderRadius: `${props.radius}px`
    }))

    const imageStyle = computed(() => {
      const style: {[x: string]: string} = {}

      if (props.image) {
        style.backgroundImage = `url(${props.image})`
      }

      return Object.assign({}, getModeStyle(props.mode), baseStyle.value, style)
    })

    const placeholderImageStyle = computed(() => {
      const style: {[x: string]: string} = {}

      if (props.placeholderImage) {
        style.backgroundImage = `url(${props.placeholderImage})`
      }

      return Object.assign({}, baseStyle.value, style)
    })

    return {
      paddingTop,
      isLoadErr,
      onLoad,
      onError,
      isShowPlaceholder,
      imageStyle,
      placeholderImageStyle
    }
  }
})
</script>

<style lang="scss">
.yuumi-ratio-image {
  position: relative;
  width: 100%;
  overflow: hidden;

  .image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;

    .placeholder__image, .taget__image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
    }

    .placeholder__image {
      background-size: contain;
      background-position: center center;
    }
  }
}
</style>
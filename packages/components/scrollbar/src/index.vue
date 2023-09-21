<template>
  <div :class="['yuumi-scrollbar', 'behavior_' + behavior]">
    <div
      ref="body"
      class="scrollbar__body"
    >
      <slot />
    </div>

    <section
      ref="horizontal"
      class="scrollbar"
      horizontal
      @mousedown.stop="onDragstart"
    />
    <section
      ref="vertical"
      class="scrollbar"
      vertical
      @mousedown.stop="onDragstart"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { useDrag } from './drag-helper'
import { useUpdateStyle } from './update-style-helper'

export default defineComponent({
  name: 'YuumiScrollbar',
  props: {
    behavior: {
      type: String,
      default: 'hover',
      validator: (value: string) => ['hover', 'always'].indexOf(value) > -1
    },
    dynamic: {
      type: Boolean
    }
  },
  emits: ['init', 'scroll'],
  setup(_, { emit }) {
    const { onDragstart } = useDrag()
    const { updateBodySize, updateHorizontalBarStyle, updateVerticalBarStyle, observe, disconnect } = useUpdateStyle()

    function onScroll (e: Event) {
      updateHorizontalBarStyle()
      updateVerticalBarStyle()
      emit('scroll', e)
    }

    return {
      onDragstart,
      updateBodySize,
      updateHorizontalBarStyle,
      updateVerticalBarStyle,
      onScroll,
      observe,
      disconnect
    }
  },
  mounted () {
    const bodyElement = this.$refs.body as HTMLElement
    bodyElement.addEventListener('scroll', this.onScroll, false)

    nextTick(() => {
      this.updateBodySize()
      this.updateVerticalBarStyle()
      this.updateHorizontalBarStyle()
      this.$emit('init',  this)
    })

    if (this.dynamic) {
      this.observe()
    }
  },
  updated() {
    if (this.dynamic) {
      this.disconnect()
      this.observe()
    }
  },
  beforeUnmount () {
    const bodyElement = this.$refs.body as HTMLElement
    bodyElement.removeEventListener('scroll', this.onScroll, false)

    if (this.dynamic) {
      this.disconnect()
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .scrollbar__body {
    position: relative;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .scrollbar {
    @include AlphaBackgroundColorWithKey("black", 0.3);
    @include BorderRadius("round");
    cursor: pointer;
    position: absolute;
    z-index: 1;
    user-select: none;
    transition: opacity 0.2s;

    &[horizontal] {
      width: 8px;
      right: 0;
      top: 0;
    }

    &[vertical] {
      height: 8px;
      bottom: 0;
      left: 0;
    }
  }

  &.behavior_hover .scrollbar {
    opacity: 0;
  }

  &:hover .scrollbar{
    opacity: 1;

    &:hover {
      @include AlphaBackgroundColorWithKey("black", 0.6);
    }
  }
}
</style>
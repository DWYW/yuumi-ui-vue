<template>
  <div :class="['yuumi-divider', 'align_' + align]">
    <div class="divider-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'YuumiDivider',
  props: {
    align: {
      type: String,
      validator: (value: string) => {
        if (!value) return true
        return ['left', 'center', 'right'].indexOf(value) > -1
      },
      default: 'center'
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-divider {
  display: flex;
  align-items: center;
  @include Border($width: 0);
  @include TextColor("secondary");
  @include Space("margin-top", "sm");
  @include Space("margin-bottom", "sm");

  &::before, &::after {
    content: ' ';
    display: block;
    border-width: 1px 0 0;
    border-style: inherit;
    border-color: inherit;
    flex: 1 1 auto;
  }

  .divider-content {
    @include Space("padding-left", "sm");
    @include Space("padding-right", "sm");
  }

  &.align_left {
    &::before {
      flex: 0 1 20px;
    }
  }

  &.align_right {
    &::after {
      flex: 0 1 20px;
    }
  }
}
</style>
<template>
  <div
    :class="['yuumi-warning', 'theme__'+theme]"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { isValidWarningTheme } from '../../../share/validator'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "YuumiWarning",
  props: {
    theme: {
      type: String,
      validator: isValidWarningTheme,
      default: 'default'
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-warning {
  @include TextColor("secondary");
  @include BorderRadius();
  @include Space("padding-top", "xm");
  @include Space("padding-right", "sm");
  @include Space("padding-bottom", "xm");
  @include Space("padding-left", "sm");
  border: 1px solid transparent;

  &.theme__default {
    border-color: getMixColorWithKey("border", "white", 50%);
    @include BackgroundColorWithKey("light");
  }

  @each $key in ("primary", "warn", "success", "danger") {
    &.theme__#{$key} {
      @if $key != "warn" {
        @include ColorWithKey($key);
      }
      background-color: getMixColorWithKey($key, "white", 15%);
      border-color: getMixColorWithKey($key, "white", 45%);
    }
  }
}
</style>

<template>
  <button
    ref="buttonEl"
    :class="['yuumi-button', 'size__'+size, 'theme__'+theme, {
      '__outline': outline,
      '__circle': circle,
      '__round': round,
      '__splash': splash
    }]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onclick"
  >
    <span
      v-if="splash"
      ref="animationEl"
      class="button__animation"
    />
    <span class="button__content">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { isValidComponentSize, isValidComponentTheme } from '../../../share/validator'

export default defineComponent({
  name: 'YuumiButton',
  props: {
    size: {
      type: String,
      validator: isValidComponentSize,
      default: 'md'
    },
    theme: {
      type: String,
      validator: isValidComponentTheme,
      default: 'default'
    },
    outline: Boolean,
    splash: Boolean,
    disabled: Boolean,
    circle: Boolean,
    round: Boolean
  },
  emits: ['click'],
  setup (props, { emit }) {
    const buttonEl: Ref<any> = ref(null)
    const animationEl: Ref<any> = ref(null)

    function addSplash (e: MouseEvent) {
      const { left, top, width } = buttonEl.value.getBoundingClientRect()
      const size = Math.max(e.pageX - left, width - (e.pageX - left))
      const splash = {
        size: size * 2,
        x: e.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft) - left - size,
        y: e.pageY - (document.body.scrollTop || document.documentElement.scrollTop) - top - size
      }
      const element = document.createElement('span')
      element.setAttribute('style', `left: ${splash.x}px; top: ${splash.y}px; width: ${splash.size}px; height: ${splash.size}px;`)

      const parentElement: any = animationEl.value
      parentElement.insertBefore(element, parentElement.firstChild)

      window.setTimeout(() => {
        parentElement && parentElement.removeChild(element)
      }, 300)
    }

    function onclick (e: MouseEvent) {
      if (props.splash && props.theme) addSplash(e)
      emit('click', e)
    }

    return {
      buttonEl,
      animationEl,
      onclick
    }
  },
  data () {
    return {
      splashs: []
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

.yuumi-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
  user-select: none;
  outline: none;
  @include BorderRadius();
  @include Border();
  background-color: transparent;
  color: inherit;
  box-sizing: border-box;
  @include Space("padding-left", "xm");
  @include Space("padding-right", "xm");
  transition: borderColor 0.2s, color 0.2s, background 0.2s;
  cursor: pointer;
  // line-height: 0;

  .button__animation {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    > span {
      position: absolute;
      display: block;
      transform-origin: center;
      animation: splash .3s;
      border-radius: 100%;
      @include AlphaBackgroundColorWithKey("primary", 0.15);
    }
  }

  .button__content {
    position: relative;
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;
      padding: 0 $value*0.4;

      &.__round {
        border-radius: $value;
      }

      &.__circle {
        width: $value;
        padding: 0;
        overflow: hidden;
        border-radius: $value;
      }
    }
  }

  &[disabled] {
    opacity: 0.5;
    cursor: no-drop;
  }

  &.theme__default {
    &:hover {
      border-color: getMixColorWithKey("primary", "white", 85%);
      color: getMixColorWithKey("primary", "white", 85%);
    }

    &:active {
      border-color: getMixColorWithKey("primary", "dark", 85%);
      color: getMixColorWithKey("primary", "dark", 85%);
    }

    &.__splash{
      &:hover, &:active {
        @include BorderColorWithKey("primary");
        @include ColorWithKey("primary");
      }
    }

    &[disabled] {
      @include BorderColorWithKey("primary");
      color: inherit;
    }
  }

  @each $key in $--theme {
    &.theme__#{$key} {
      @include BackgroundColorWithKey($key);
      @include BorderColorWithKey($key);

      @if $key == "warn" {
        color: inherit;
      } @else {
        @include ColorWithKey("white");
      }

      &:hover {
        border-color: getMixColorWithKey($key, "white", $percent: 85%);
        background-color: getMixColorWithKey($key, "white", $percent: 85%);
      }

      &:active {
        border-color: getMixColorWithKey($key, "dark", 85%);
        background-color: getMixColorWithKey($key, "dark", 85%);
      }

      &.__splash{
        .button__animation > span {
          @include AlphaBackgroundColorWithKey("white", 0.25);
        }

        &:hover, &:active {
          @include BackgroundColorWithKey($key);
          @include BorderColorWithKey($key);
        }
      }

      &[disabled] {
        @include BackgroundColorWithKey($key);
        @include BorderColorWithKey($key);
      }

      &.__outline {
        background-color: transparent;
        @include ColorWithKey($key);

        &:hover {
          background-color: getMixColorWithKey($key, "white", 10%);
          color: getMixColorWithKey($key, "white", 85%);
        }

        &:active {
          @include BackgroundColorWithKey($key);
          @include BorderColorWithKey($key);

          @if $key == "warn" {
            color: inherit;
          } @else {
            @include ColorWithKey("white");
          }
        }

        &.__splash{
          .button__animation > span {
            @include AlphaBackgroundColorWithKey($key, 0.15);
          }

          &:hover, &:active {
            background-color: transparent;
            @include ColorWithKey($key);
          }
        }

        &[disabled] {
          background-color: transparent;
          @include ColorWithKey($key);
        }
      }
    }
  }
}

@keyframes splash {
  0% {
    transform: scale(.1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
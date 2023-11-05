<template>
  <teleport to="body">
    <transition
      name="yuumi-dialog"
      appear
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <div
        v-if="modelValue"
        class="yuumi-dialog"
        v-bind="$attrs"
      >
        <div
          class="dialog-panel"
          :style="panelStyle"
        >
          <div class="dialog--header">
            <div class="dialog-title">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <YuumiIcon
              v-if="closeEnable"
              class="dialog-close"
              icon="line-close"
              @click="close"
            />
          </div>
          <div :class="['dialog--content', { '_center': alignCenter }]">
            <slot />
          </div>

          <div
            v-if="cancelEnable || confirmEnable"
            class="dialog--footer"
          >
            <YuumiButton
              v-if="cancelEnable"
              @click="cancel"
            >
              {{ cancelText }}
            </YuumiButton>
            <YuumiButton
              v-if="confirmEnable"
              theme="primary"
              @click="confirm"
            >
              {{ confirmText }}
            </YuumiButton>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getCss } from '../../../share/helper'

export default defineComponent({
  name: 'YuumiDialog',
  props: {
    modelValue: Boolean,
    title: {
      type: String
    },
    width: {
      type: String
    },
    closeEnable: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    cancelEnable: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    confirmEnable: {
      type: Boolean,
      default: true
    },
    async: {
      type: Boolean,
      default: false
    },
    alignCenter: Boolean,
    stopPenetrate: Boolean
  },
  emits: ['update:modelValue', 'close', 'cancel', 'confirm', 'beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'],
  setup(props) {
    const store = {
      overflow: '',
      scrollLeft: 0,
      scrollTop: 0
    }

    const panelStyle = computed(() => {
      return {
        width: props.width
      }
    })

    return {
      store,
      panelStyle
    }
  },
  methods: {
    hide () {
      // 兼容原来的sync写法，推荐使用async
      if (this.async || this.$attrs.sync === false) return
      this.$emit('update:modelValue', false)
    },
    close () {
      this.hide()
      this.$emit('close', false)
    },
    cancel () {
      this.hide()
      this.$emit('cancel', false)
    },
    confirm () {
      this.hide()
      this.$emit('confirm', false)
    },
    beforeEnter (el: any) {
      this.$emit('beforeEnter', el)

      if (this.stopPenetrate) {
        this.saveScrollBehavior()
      }
    },
    afterEnter (el: any) {
      this.$emit('afterEnter', el)
    },
    beforeLeave (el: any) {
      this.$emit('beforeLeave', el)
    },
    afterLeave (el: any) {
      this.$emit('afterLeave', el)

      if (this.stopPenetrate) {
        this.restoreScrollBehavior()
      }
    },
    saveScrollBehavior () {
      this.store.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
      this.store.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.store.overflow = getCss(document.body, 'overflow') || ''

      this.updateOverflow('hidden')
    },
    restoreScrollBehavior () {
      document.body.scrollLeft = document.documentElement.scrollLeft = this.store.scrollLeft
      document.body.scrollTop = document.documentElement.scrollTop = this.store.scrollTop
      this.updateOverflow(this.store.overflow)

      this.store.scrollLeft = 0
      this.store.scrollTop = 0
      this.store.overflow = ''
    },
    updateOverflow (value: string) {
      let style = document.body.getAttribute('style') || ''

      if (/overflow/.test(style)) {
        style = style.replace(/overflow.*?;/, `overflow: ${value};`)
      } else {
        style += `overflow: ${value};`
      }

      document.body.setAttribute('style', style)
    }
  }
})
</script>

<style lang="scss">
@import "../../../styles/mixin.scss";

$panel-top: 50%;

.yuumi-dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include Level(2);

  font-size: 14px;

  &::before {
    display: block;
    content: '';

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    @include BackgroundColorWithKey("mask");
  }

  .dialog-panel {
    max-width: 100%;
    width: 500px;
    position: absolute;
    left: 50%;
    top: $panel-top;
    transform: translate3d(-50%, -50%, 0);
    @include BackgroundColorWithKey("white");
    @include BorderRadius();
    overflow: hidden;
    @include Shadow($blur: getSpaceWithKey("sm"), $key: "tertiary");
  }

  .dialog--header {
    @include Space("padding", "sm");
    @include BackgroundColorWithKey("light");
    position: relative;

    .dialog-title {
      @include Space("padding-right", "xm");
      font-size: 1.14em;
    }

    .dialog-close {
      display: block;
      position: absolute;
      @include Space("right", "xm");
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 1.14em;
    }
  }

  .dialog--content {
    min-height: 128px;
    @include Space("padding", "sm");

    &._center {
      text-align: center;
    }
  }

  .dialog--footer {
    @include Space("padding", "sm");
    padding-top: 0;
    text-align: center;

    .yuumi-button {
      min-width: 80px;
    }

    :not(:last-child) {
      @include Space("margin-right", "sm");
    }
  }
}

.yuumi-dialog-enter-active, .yuumi-dialog-leave-active {
  transition: opacity .2s;

  .dialog-panel {
    transition: top .2s;
  }
}

.yuumi-dialog-enter-from, .yuumi-dialog-leave-to {
  opacity: 0;
}

.yuumi-dialog-enter-from .dialog-panel {
  top: $panel-top - 10%;
}

.yuumi-dialog-leave-to .dialog-panel {
  top: $panel-top + 10%;
}
</style>
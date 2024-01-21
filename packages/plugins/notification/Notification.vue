<template>
  <Teleport to="body">
    <Transition
      appear
      :name="ns.n()"
      @before-enter="e => $emit('beforeEnter', e)"
      @after-enter="afterEnterHandler"
      @before-leave="beforeLeaveHandler"
      @after-leave="e => $emit('afterLeave', e)"
    >
      <div
        v-if="isShow"
        :ref="_refs.el"
        :class="[ns.n(), ns.m(direction), ns.m(theme), ns.is(ns.m('appeared'), isAppeared)]"
        :style="{
          top: /t/.test(direction) ? position + 'px' : void 0,
          bottom: /b/.test(direction) ? position + 'px' : void 0
        }"
      >
        <div :class="ns.e('body')">
          <div :class="ns.e('icon')">
            <slot name="icon">
              <YuumiIcon :icon="defaultIcon" />
            </slot>
          </div>

          <div :class="ns.e('content')">
            <div :class="ns.e('title')">
              <slot name="title" />
            </div>

            <div :class="ns.e('message')">
              <slot />
            </div>
          </div>

          <div :class="ns.e('close')">
            <YuumiIcon icon="line-close" @click="closeHanlder" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useNameSpace } from "../../share/useApi"
import { notificationProps } from "./props"
import { notificationEmits } from "./emits"

const props = defineProps(notificationProps)
const emit = defineEmits(notificationEmits)
const ns = useNameSpace("notification")

const _refs = {
  el: ref()
}
const isShow = ref(true)
const isAppeared = ref(false)
const defaultIcon = computed(() => {
  const icons: Record<string, string> = {
    default: "line-info",
    success: "line-circle-correct",
    danger: "line-circle-close"
  }
  return icons[props.theme] || icons.default
})

function afterEnterHandler(el: Element) {
  isAppeared.value = true
  addTimeout()
  emit("afterEnter", el)
}

function beforeLeaveHandler(el: Element) {
  removeTimeout
  emit("beforeLeave", el)
}

function closeHanlder() {
  isShow.value = false
  removeTimeout
}

const timeout = ref()
function addTimeout() {
  if (!props.duration) return

  timeout.value = window.setTimeout(() => {
    timeout.value = null
    isShow.value = false
  }, props.duration)
}
function removeTimeout() {
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = null
}

defineExpose({
  props: props,
  refs: _refs,
  hide: () => (isShow.value = false),
  isVisible: computed(() => isShow.value)
})
</script>

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
        :class="[ns.n(), ns.is(ns.m('appeared'), isAppeared)]"
        :style="{
          top: top + 'px'
        }"
      >
        <YuumiWarning :theme="theme">
          <div :class="ns.e('body')">
            <div :class="ns.e('icon')">
              <slot name="icon">
                <YuumiIcon icon="line-info" />
              </slot>
            </div>

            <div :class="ns.e('content')">
              <slot />
            </div>
          </div>
        </YuumiWarning>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useNameSpace } from "../../share/useApi"
import { messageProps } from "./props"
import { messageEmits } from "./emits"

const props = defineProps(messageProps)
const emit = defineEmits(messageEmits)
const ns = useNameSpace("message")

const _refs = {
  el: ref()
}
const isShow = ref(true)
const isAppeared = ref(false)

function afterEnterHandler(el: Element) {
  isAppeared.value = true
  addTimeout()
  emit("afterEnter", el)
}

function beforeLeaveHandler(el: Element) {
  removeTimeout
  emit("beforeLeave", el)
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

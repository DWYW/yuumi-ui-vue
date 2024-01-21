<template>
  <teleport to="body">
    <transition
      :name="ns.n()"
      appear
      @before-enter="beforeEnterHanlder"
      @after-enter="afterEnterHanlder"
      @before-leave="beforeLeaveHanlder"
      @after-leave="afterLeaveHanlder"
    >
      <div v-if="isVisible" :class="ns.n()" v-bind="$attrs">
        <div :class="ns.e('panel')" :style="{ width: width }">
          <div :class="ns.e('header')">
            <div :class="ns.e('title')">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <YuumiIcon
              v-if="closeEnable"
              :class="ns.eb('icon', 'close')"
              icon="line-close"
              @click="closeHanlder"
            />
          </div>
          <div :class="[ns.e('content'), { 'is-center': alignCenter }]">
            <slot />
          </div>

          <div v-if="cancelEnable || confirmEnable" :class="ns.e('footer')">
            <YuumiButton v-if="cancelEnable" @click="cancelHandler">
              {{ cancelText }}
            </YuumiButton>

            <YuumiButton v-if="confirmEnable" theme="primary" @click="confirmHandler">
              {{ confirmText }}
            </YuumiButton>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useAttrs, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { dialogProps } from "./props"
import { dialogEmits } from "./emits"
import { useStopPenetrate } from "./useStopPenetrate"

defineOptions({ name: "YuumiDialog", inheritAttrs: false })
const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const ns = useNameSpace("dialog")
const attrs = useAttrs()

const isVisible = ref(props.modelValue)
watch(
  () => isVisible.value,
  function (value) {
    if (value === props.modelValue) return
    emit("update:modelValue", value)
  }
)
watch(
  () => props.modelValue,
  function (value, oldValue) {
    if (value === oldValue) return
    isVisible.value = value
  }
)

function hide() {
  if (props.async || attrs.sync === false) return
  isVisible.value = false
}

const { saveScrollBehavior, restoreScrollBehavior } = useStopPenetrate()

function beforeEnterHanlder(el: Element) {
  emit("before-enter", el)
  if (props.stopPenetrate) {
    saveScrollBehavior()
  }
}

function afterEnterHanlder(el: Element) {
  emit("after-enter", el)
}

function beforeLeaveHanlder(el: Element) {
  emit("before-leave", el)
}

function afterLeaveHanlder(el: Element) {
  emit("after-leave", el)
  if (props.stopPenetrate) {
    restoreScrollBehavior()
  }
}

function closeHanlder() {
  hide()
  emit("close", { close: true })
}

function cancelHandler() {
  hide()
  emit("cancel", { cancel: true })
}

function confirmHandler() {
  hide()
  emit("confirm", { confirm: true })
}
</script>

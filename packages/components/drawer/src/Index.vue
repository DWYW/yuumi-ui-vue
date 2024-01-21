<template>
  <teleport to="body">
    <div v-if="isVisible" :class="[ns.n(), ns.m(position)]">
      <transition :name="ns.b('mask')">
        <div v-show="isShow" :class="ns.e('mask')" @click="maskClickHandler" />
      </transition>

      <transition
        :name="ns.n()"
        @before-enter="beforeEnterHanlder"
        @after-enter="afterEnterHanlder"
        @before-leave="beforeLeaveHanlder"
        @after-leave="afterLeaveHanlder"
      >
        <div v-show="isShow" :class="ns.e('body')" :style="bodyStyle">
          <slot />
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, computed } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { drawerProps } from "./props"
import { drawerEmits } from "./emits"

defineOptions({ name: "YuumiDrawer", inheritAttrs: false })
const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)
const ns = useNameSpace("drawer")

const bodyStyle = computed(() => {
  if (/left|right/.test(props.position) && props.width) {
    return { width: props.width }
  }

  if (/top|bottom/.test(props.position) && props.height) {
    return { height: props.height }
  }

  return {}
})

const isVisible = ref(props.modelValue)
const isShow = ref(props.modelValue)

watch(
  () => props.modelValue,
  function (value, oldValue) {
    if (value === oldValue || value === isVisible.value) return

    if (value) {
      isVisible.value = true
    }

    nextTick(() => {
      isShow.value = value
    })
  }
)

watch(
  () => isVisible.value,
  function (value) {
    if (value === props.modelValue) return
    emit("update:modelValue", value)
  }
)

function beforeEnterHanlder(el: Element) {
  emit("before-enter", el)
}

function afterEnterHanlder(el: Element) {
  emit("after-enter", el)
}

function beforeLeaveHanlder(el: Element) {
  emit("before-leave", el)
}

function afterLeaveHanlder(el: Element) {
  emit("after-leave", el)
  isVisible.value = false
}

function maskClickHandler() {
  isShow.value = false
}
</script>

<template>
  <Teleport :to="teleport">
    <Transition
      appear
      :name="ns.n()"
      @before-enter="e => $emit('beforeEnter', e)"
      @after-enter="e => $emit('afterEnter', e)"
      @before-leave="e => $emit('beforeLeave', e)"
      @after-leave="e => $emit('afterLeave', e)"
    >
      <div
        v-if="isShow"
        :ref="_refs.el"
        :class="[ns.n(), ns.is(ns.m('fixed'), teleport === 'body')]"
      >
        <div :class="ns.e('content')">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useNameSpace } from "../../share/useApi"
import { loadingProps } from "./props"
import { loadingEmits } from "./emits"

const props = defineProps(loadingProps)
defineEmits(loadingEmits)
const ns = useNameSpace("loading")

const _refs = {
  el: ref()
}
const isShow = ref(true)

defineExpose({
  props: props,
  refs: _refs,
  show: () => (isShow.value = true),
  hide: () => (isShow.value = false),
  isVisible: computed(() => isShow.value)
})
</script>

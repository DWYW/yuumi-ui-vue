<template>
  <button
    :ref="_refs.btnRef"
    :class="[
      ns.n(),
      ns.m(size),
      ns.m(theme),
      ns.is(ns.m('plain'), plain),
      ns.is(ns.m('circle'), circle),
      ns.is(ns.m('round'), round),
      ns.is(ns.m('splash'), splash)
    ]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="hanlderClick"
  >
    <span v-if="splash" :ref="_refs.splashRef" :class="ns.e('animation')" />
    <span :class="ns.e('content')">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { buttonProps } from "./props"
import { buttonEmits } from "./emits"
import { useEvent } from "./useEvent"
import type { ComputedRef } from "vue"
import type { ButtonProps } from "./props"

defineOptions({ name: "YuumiButton" })
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const ns = useNameSpace("button")

const _refs = {
  btnRef: ref<HTMLButtonElement>(),
  splashRef: ref<HTMLElement>()
}
const _props: ComputedRef<ButtonProps> = computed(() => {
  return getComponentProps(props)
})
const { hanlderClick } = useEvent(_props.value, emit, _refs)
</script>

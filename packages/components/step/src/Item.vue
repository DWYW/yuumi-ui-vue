<template>
  <div
    :class="[
      ns.n(),
      ns.is(ns.m('completed'), stateCode > 0),
      ns.is(ns.m('processing'), stateCode === 0),
      ns.is(ns.m('waiting'), stateCode < 0),
      ns.is(ns.m('error'), isError)
    ]"
  >
    <div :class="ns.e('line')" />
    <div :class="ns.e('icon')">
      <slot name="icon">
        <div :class="ns.eb('icon', 'system')">
          <YuumiIcon v-if="isError" icon="line-close" />
          <YuumiIcon v-else-if="icon" :icon="icon" />
          <YuumiIcon v-else-if="stateCode > 0" icon="line-correct" />
          <span v-else>{{ index + 1 }}</span>
        </div>
      </slot>
    </div>
    <div :class="ns.e('content')">
      <div :class="ns.e('title')">
        {{ title }}
      </div>
      <div :class="ns.e('description')">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, useAttrs } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { stepItemProps } from "./props"
import { propsProvideKey } from "./provide"
import type { ComputedRef } from "vue"
import type { StepProps } from "./props"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiStepItem" })
defineProps(stepItemProps)
const ns = useNameSpace("step-item")
const attrs = useAttrs()
const rootProps = inject<ComputedRef<StepProps>>(propsProvideKey)!

const index = computed(() => Number(attrs.index) || 0)
const stateCode = computed(() => {
  return rootProps.value.active - index.value
})
const isError = computed(() => {
  return stateCode.value === 0 && rootProps.value.error
})
</script>

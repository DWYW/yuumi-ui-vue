<template>
  <div :class="[ns.n(), ns.m(direction), ns.is(ns.m('mini'), mini)]">
    <template v-for="(step, index) in steps" :key="index">
      <component :is="step" :index="index" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, useSlots } from "vue"
import { useChildrenVNode, useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { StepProps, stepProps } from "./props"
import { propsProvideKey } from "./provide"
import { YuumiStepItem } from ".."

defineOptions({ name: "YuumiStep" })
const ns = useNameSpace("step")
const props = defineProps(stepProps)
const _props = computed<StepProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)

const slots = useSlots()
const steps = computed<any[]>(() => {
  return useChildrenVNode(slots.default ? slots.default() : [], YuumiStepItem.name!)
})
</script>

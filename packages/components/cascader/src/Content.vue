<template>
  <div :class="[ns.e('content')]">
    <div :class="[ns.eb('content', 'text')]">
      <span v-if="selectionsText">{{ selectionsText }}</span>
      <span v-else :class="ns.e('placeholder')">{{ rootProps.placeholder }}</span>
    </div>
  </div>
  <div :class="[ns.e('icon')]">
    <YuumiIcon v-if="state.isLoading" icon="line-loading" :class="ns.em('icon', 'loading')" />
    <YuumiIcon
      v-else-if="state.isCanClear"
      icon="line-circle-close"
      :class="ns.em('icon', 'clear')"
      @click.stop="clearHandler"
    />
    <YuumiIcon v-else icon="flat-arrow-bottom" :class="ns.em('icon', 'default')" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { propsProvideKey, selectionProvideKey, stateProvideKey } from "./provide"
import { CascaderProps } from "./props"
import type { ComputedRef } from "vue"
import type { CascaderSelection } from "./useSelection"
import type { CascaderState } from "./useState"
import { YuumiIcon } from "../../icon"

defineOptions({ name: "YuumiCascaderContent" })
const emit = defineEmits(["clear"])
const ns = useNameSpace("cascader")
const rootProps = inject<ComputedRef<CascaderProps>>(propsProvideKey)!
const state = inject<ComputedRef<CascaderState>>(stateProvideKey)!
const { selectionsText, clearSelections } = inject<CascaderSelection>(selectionProvideKey)!

function clearHandler() {
  clearSelections()
  emit("clear")
}
</script>

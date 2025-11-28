<template>
  <YuumiTree
    :ref="_refs.tree"
    :class="[ns.n()]"
    v-bind="treeProps"
    :checkable="false"
    :expand-icon-visible="false"
  >
    <template #default="{ node, isLeaf }">
      <div :class="ns.e('content')">
        <div v-if="node.icon" :class="ns.em('icon', 'prefix')">
          <YuumiIcon :icon="node.icon" />
        </div>

        <div :class="ns.e('label')">
          {{ node.label }}
        </div>

        <div :class="[ns.em('icon', 'suffix')]">
          <YuumiIcon v-if="!isLeaf" icon="line-arrow-right" />
        </div>
      </div>
    </template>
  </YuumiTree>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { navsProps } from "./props"
import { YuumiIcon } from "../../icon"
import { YuumiTree } from "../../tree"

defineOptions({ name: "YuumiNavs" })
const ns = useNameSpace("navs")
const props = defineProps(navsProps)
const treeProps = computed(() => ({
  data: props.data,
  optionKey: props.optionKey,
  expandIcon: props.expandIcon,
  expandIconVisible: props.expandIconVisible,
  loadData: props.loadData
}))

const _refs = {
  tree: ref()
}

watch(
  () => props.selectedNode,
  (value, oldValue) => {
    if (value === oldValue) return
    nextTick(() => {
      if (!_refs.tree.value) return

      _refs.tree.value.clearSelectedNodes()
      value && _refs.tree.value.setSelectedNode(value)
    })
  },
  { immediate: true }
)
</script>

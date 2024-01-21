<template>
  <div :class="[ns.n(), ns.is(ns.m('inline'), inline), $attrs.class]">
    <NodeComponent
      v-for="(item, index) in data"
      :key="getAttrValue(item, 'value')"
      :ref="c => (_refs.children.value[index] = c)"
      :node="item"
    >
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </NodeComponent>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, onBeforeUnmount, ref } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { getComponentProps } from "../../../share/vueHelper"
import { TreeProps, treeProps } from "./props"
import { treeEmits } from "./emits"
import {
  emitsProvideKey,
  nodeHelperProvideKey,
  propsProvideKey,
  selectionProvideKey
} from "./provide"
import { useNodeHelper } from "./useNodeHelper"
import { useSelection } from "./useSelection"
import NodeComponent from "./Node.vue"

defineOptions({ name: "YuumiTree", inheritAttrs: false })
const ns = useNameSpace("tree")
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
provide(emitsProvideKey, emit)

const _refs = {
  children: ref<any[]>([])
}
const _props = computed<TreeProps>(() => getComponentProps(props))
provide(propsProvideKey, _props)

const nodeHelper = useNodeHelper(_props)
provide(nodeHelperProvideKey, nodeHelper)
const { keys, getAttrValue } = nodeHelper

const selection = useSelection()
provide(selectionProvideKey, selection)

onBeforeUnmount(() => {
  // 销毁selection数据，防止内存溢出
  selection.destory()
})

defineExpose({
  getTreeData: () => _refs.children.value.map((item: any) => item.getNodeData()),
  getCheckedNodes: () =>
    selection.getSelections(item => ({
      [keys.value.value]: getAttrValue(item, "value"),
      [keys.value.label]: getAttrValue(item, "label", ""),
      [keys.value.disabled]: getAttrValue(item, "disabled", false)
    })),
  setSelectedNode: selection.add,
  clearSelectedNodes: () => selection.clear()
})
</script>

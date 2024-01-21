<template>
  <div
    :class="[
      ns.n(),
      ns.is(ns.m('leaf'), isLeafNode),
      ns.is('has-expand-icon', rootProps.expandIconVisible)
    ]"
  >
    <div
      :class="[ns.e('content'), ns.is('is-expand', isExpand), ns.is('is-checked', isChecked)]"
      :style="contentStyle"
      @click="clickHandler"
    >
      <div v-if="isExpandVisible" :class="[ns.e('expand'), ns.is('_loading', isLoading)]">
        <YuumiIcon v-if="isLoading" icon="line-loading" />
        <YuumiIcon v-else v-bind:="rootProps.expandIcon" @click.stop="expandHandler" />
      </div>

      <div v-if="rootProps.checkable" :class="ns.e('checkbox')">
        <YuumiCheckbox
          :model-value="isChecked"
          :unique="nodeValue"
          :disabled="isDisbled"
          :indeterminate="isIndeterminate"
          @update:modelValue="checkboxStateUpdate($event, true)"
          @click.stop="() => void 0"
        />
      </div>

      <div :class="ns.e('label')">
        <slot :node="node" :is-leaf="isLeafNode">
          {{ nodeLabel }}
        </slot>
      </div>
    </div>

    <Transition
      v-if="!isLeafNode"
      :name="ns.n()"
      @beforeEnter="childrenBeforeEnter"
      @enter="childrenEnter"
      @afterEnter="childrenAfterEnter"
      @beforeLeave="childrenBeforeLeave"
      @leave="childrenLeave"
      @afterLeave="childrenAfterLeave"
    >
      <div v-show="isExpand" :class="ns.e('children')">
        <YuumiTreeNode
          v-for="(item, index) in children"
          :key="getAttrValue(item, 'value')"
          :ref="(c: any) => (_refs.children.value[index] = c)"
          :node="item"
          :padding-left="paddingLeft + paddingStep"
        >
          <template #default="slotProps">
            <slot v-bind="slotProps" />
          </template>
        </YuumiTreeNode>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch, onBeforeMount } from "vue"
import { useNameSpace } from "../../../share/useApi"
import {
  emitsProvideKey,
  nodeHelperProvideKey,
  propsProvideKey,
  selectionProvideKey
} from "./provide"
import { useExpand } from "./useExpand"
import type { ComputedRef } from "vue"
import type { NodeHelper } from "./useNodeHelper"
import type { TreeProps } from "./props"
import type { TreeEmits } from "./emits"
import type { TreeSelection } from "./useSelection"

defineOptions({ name: "YuumiTreeNode", inheritAttrs: false })
const props = defineProps({
  node: { type: Object, required: true },
  paddingLeft: { type: Number, default: 0 },
  paddingStep: { type: Number, default: 1.5 }
})
const _refs = {
  children: ref<any[]>([])
}

const ns = useNameSpace("tree-node")
const rootProps = inject<ComputedRef<TreeProps>>(propsProvideKey)!
const rootEmit = inject<(envent: keyof TreeEmits, ...rest: any) => void>(emitsProvideKey)!
const contentStyle = computed(() => ({
  paddingLeft: `${props.paddingLeft}em`
}))
const { getAttrValue, keys } = inject<NodeHelper>(nodeHelperProvideKey)!
const nodeValue = computed(() => getAttrValue<any>(props.node, "value"))
const nodeLabel = computed(() => getAttrValue<string>(props.node, "label", ""))
const children = ref(getAttrValue<any[]>(props.node, "children", []))

watch(
  () => props.node,
  (value, oldValue) => {
    if (value === oldValue) return
    children.value = getAttrValue<any[]>(props.node, "children", [])
  }
)

const isLeafNode = computed(() => {
  if (typeof rootProps.value.loadData === "function" && children.value.length === 0) {
    if (loadState.value === LOAD_STATE.DEFAULT) return false
    if (loadState.value === LOAD_STATE.LOADING) return false
  }

  return children.value.length === 0
})
const isDisbled = computed(() => getAttrValue<boolean>(props.node, "disabled", false))
const isExpandVisible = computed(() => {
  if (!rootProps.value.expandIconVisible) return false
  return !isLeafNode.value
})

const {
  isExpand,
  updateExpandState,
  childrenBeforeEnter,
  childrenEnter,
  childrenAfterEnter,
  childrenBeforeLeave,
  childrenLeave,
  childrenAfterLeave
} = useExpand()

function expandHandler() {
  tryLoadChildren().finally(() => {
    updateExpandState(!isExpand.value)
    rootEmit("node-expand", { node: props.node, value: isExpand.value })
  })
}

// 设置初始expand状态
updateExpandState(getAttrValue(props.node, "expand", false))

const LOAD_STATE = {
  DEFAULT: 0,
  LOADED: 1,
  FAILED: 2,
  LOADING: 3
}
const loadState = ref(LOAD_STATE.DEFAULT)
const isLoading = computed(() => loadState.value === LOAD_STATE.LOADING)

function tryLoadChildren(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (children.value.length > 0) return resolve()
    if (typeof rootProps.value.loadData !== "function" || loadState.value !== LOAD_STATE.DEFAULT)
      return resolve()
    loadState.value = LOAD_STATE.LOADING
    rootProps.value.loadData(props.node).then(
      data => {
        children.value = data || []
        loadState.value = LOAD_STATE.LOADED
        nextTick(() => {
          // 如果节点是选中状态，设置children的选中状态
          if (isChecked.value) {
            children.value.forEach(child => selection.add(child))
          }
          resolve()
        })
      },
      err => {
        loadState.value = LOAD_STATE.DEFAULT
        reject(err)
      }
    )
  })
}

const selection = inject<TreeSelection>(selectionProvideKey)!
const isChecked = ref(false)
const isIndeterminate = ref(false)

watch(
  () => isChecked.value,
  (value, oldValue) => {
    if (value === oldValue) return
    value ? selection.add(props.node) : selection.remove(props.node)
  }
)

onMounted(() => {
  if (rootProps.value.checkable) {
    const _checked = getAttrValue(props.node, "checked", false)
    if (_checked) {
      checkboxStateUpdate(_checked)
    } else {
      updateCheckedState()
    }
  } else {
    updateCheckedState()
  }

  selection.addListener(props.node, updateCheckedState)
})

onBeforeMount(() => {
  selection.removeListener(props.node)
})

/**
 * checkbox的状态被更新（通过某个动作被动更新）
 * @param checked 是否选中
 * @param isEmit 是否触发emit
 */
function checkboxStateUpdate(checked: boolean, isEmit?: boolean) {
  isChecked.value = checked

  // 向下更新选中状态
  if (!isLeafNode.value && isExpand.value) {
    _refs.children.value.forEach(child => {
      child.checkboxStateUpdate(checked)
    })
  }

  if (!isLeafNode.value && !isExpand.value && children.value.length) {
    children.value.forEach(child => {
      checked ? selection.add(child) : selection.remove(child)
    })
  }

  isEmit && rootEmit("checked", { node: props.node, value: checked })
}

function updateCheckedState() {
  if (isLeafNode.value || !rootProps.value.checkable) {
    isIndeterminate.value = false
    isChecked.value = selection.isSelectedNode(props.node)
    return
  }

  // 如果异步加载未加载完成
  if (typeof rootProps.value.loadData === "function" && loadState.value < LOAD_STATE.LOADED) {
    isIndeterminate.value = false
    isChecked.value = selection.isSelectedNode(props.node)
  } else {
    const childrenSelectedState = selection.getChildrenSelectedState(children.value)
    // 子节点没有被选中，查看祖孙元素
    const indeterminate =
      childrenSelectedState === 0 || _refs.children.value.some(child => child.isIndeterminate)
    isIndeterminate.value = indeterminate
    isChecked.value = childrenSelectedState === 1
  }
}

function getNodeData() {
  return {
    [keys.value.value]: nodeValue.value,
    [keys.value.label]: nodeLabel.value,
    [keys.value.checked]: isChecked.value,
    [keys.value.disabled]: isDisbled.value,
    [keys.value.expand]: isExpand.value,
    [keys.value.children]: _refs.children.value.map(child => child.getNodeData()),
    isLeaf: isLeafNode.value
  }
}

defineExpose({
  checkboxStateUpdate,
  getNodeData
})

function clickHandler(e: Event) {
  rootEmit("node-click", { node: props.node, target: e.target })
  if (!rootProps.value.expandIconVisible) {
    !isLeafNode.value && expandHandler()
  }
}
</script>

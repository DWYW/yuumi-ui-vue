import { Ref, VNodeRef, PropType, watchEffect } from 'vue'
import { defineComponent, h, provide, ref } from 'vue'
import TreeNode from './tree-node'
import useProvider, { providerKey, ProviderState } from './provider-helper'

export default defineComponent({
  name: 'YuumiTree',
  components: { TreeNode },
  props: {
    data: { type: Array, default: () => [] },
    optionKey: { type: Object },
    expandIcon: { type: Object, default: () => ({ icon: 'flat-arrow-bottom' })},
    expandIconVisible: { type: Boolean, default: true },
    checkable: { type: Boolean, default: true },
    loadData: { type: Function as PropType<() => Promise<any>> }
  },
  emits: ['checked', 'node-expand', 'node-click'],
  setup (props, { emit, expose }) {
    const nodeRefs: Ref<VNodeRef[]> = ref([])

    expose({
      getTreeData: () => nodeRefs.value.map((item: any) => item.getNodeData()),
      getCheckedNodes: (ignoreChildren?: boolean) => nodeRefs.value.reduce((nodes: any, item: any) => {
        return nodes.concat(item.getCheckedNodes(ignoreChildren))
      }, [])
    })

    const {
      getNodeLabel,
      getLabelKey,
      getNodeValue,
      getValueKey,
      getNodeChildren,
      getChildrenKey,
      getNodeDisabled,
      getDisabledKey,
      getNodeChecked,
      getCheckedKey,
      getNodeExpand,
      getExpandKey
    } = useProvider(props.optionKey)
    provide<ProviderState>(providerKey, {
      dispatch: (name, detail) => emit(name, detail),
      getNodeLabel,
      getLabelKey,
      getNodeValue,
      getValueKey,
      getNodeChildren,
      getChildrenKey,
      getNodeDisabled,
      getDisabledKey,
      getNodeChecked,
      getCheckedKey,
      getNodeExpand,
      getExpandKey,
      childrenLoader: props.loadData
    })

    watchEffect(() => {
      // 防止因为节点数量变化导致 null 的出现
      if (props.data.length !== nodeRefs.value.length) {
        nodeRefs.value.splice(props.data.length)
      }
    })

    return { nodeRefs, getNodeValue }
  },
  render () {
    return h('div', { class: 'yuumi-tree' }, this.data.map((item: any, index: number) => {
      return h(TreeNode as any, {
        node: item,
        checkable: this.checkable,
        expandIcon: this.expandIcon,
        expandIconVisible: this.expandIconVisible,
        ref: (el: any) => this.nodeRefs[index] = el,
        key: this.getNodeValue(item)
      }, {
        default: this.$slots.default
      })
    }))
  }
})
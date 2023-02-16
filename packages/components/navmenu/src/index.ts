import { Ref, VNodeRef, PropType, watchEffect } from 'vue'
import { defineComponent, h, provide, ref } from 'vue'
import MenuNode from './menu-node'
import useProvider, { providerKey, ProviderState } from './provider-helper'

export default defineComponent({
  name: 'YuumiNavMenu',
  props: {
    data: { type: Array, default: () => [] },
    optionKey: { type: Object },
    expandIcon: { type: Object, default: () => ({ icon: 'line-arrow-bottom' })},
    expandIconVisible: { type: Boolean, default: true },
    loadData: { type: Function as PropType<() => Promise<any>> },
    selectedNode: { type: Object }
  },
  components: { MenuNode },
  emits: ['node-expand', 'node-click', 'node-mouseenter', 'node-mouseleave'],
  setup (props, { emit, expose }) {
    const nodeRefs: Ref<VNodeRef[]> = ref([])

    expose({
      getTreeData: () => nodeRefs.value.map((item: any) => item.getNodeData())
    })

    const {
      getNodeLabel,
      getLabelKey,
      getNodeValue,
      getValueKey,
      getNodeChildren,
      getChildrenKey,
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
      getNodeExpand,
      getExpandKey,
      getSelectedNode: () => props.selectedNode,
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
    return h('div', { class: 'yuumi-navmenu' }, this.data.map((item: any, index: number) => {
      return h(MenuNode as any, {
        node: item,
        depth: 0,
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
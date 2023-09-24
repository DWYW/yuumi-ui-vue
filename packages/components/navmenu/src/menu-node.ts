import { computed, defineComponent, getCurrentInstance, h, inject, nextTick, Ref, ref, resolveComponent, Transition, VNodeRef, vShow, watch, watchEffect, withDirectives } from 'vue'
import { providerKey, ProviderState } from './provider-helper'
import useChildren, { LOAD_STATUS } from './children-helper'
import useExpand from './expand-helper'

export default defineComponent({
  name: 'YuumiNavMenuNode',
  props: {
    node: { type: Object, required: true },
    expandIcon: { type: Object },
    expandIconVisible: { type: Boolean },
    depth: { type: Number, default: 0 }
  },
  emits: ['change'],
  setup (props, { expose }) {
    const instance = getCurrentInstance()!
    const {
      dispatch,
      getNodeLabel,
      getLabelKey,
      getNodeValue,
      getValueKey,
      getNodeChildren,
      getChildrenKey,
      getNodeExpand,
      getExpandKey,
      getSelectedNode,
      childrenLoader
    } = inject(providerKey) as ProviderState

    const childrenRefs: Ref<VNodeRef[]> = ref([])
    const selectedNodeValue = computed(() => getNodeValue(getSelectedNode()))
    const label = computed(() => getNodeLabel(props.node))
    const value = computed(() => getNodeValue(props.node))
    const children: Ref<any[]> = ref(getNodeChildren(props.node))
    const loadStatus = ref(LOAD_STATUS.DEFAULT)
    const { isLeaf } = useChildren({ children, loadStatus }, childrenLoader)
    const expand: Ref<boolean> = ref(getNodeExpand(props.node))
    const { expandRender, expandFunc } = useExpand({ expand, updateExpand: (v: boolean) => {
      expand.value = v
    }}, {
      expand: () => {
        // 异步加载
        if (childrenLoader) {
          if (loadStatus.value === LOAD_STATUS.LOADING) return Promise.reject('children is loading.')
          if (!isLeaf.value && loadStatus.value === LOAD_STATUS.DEFAULT) {
            loadStatus.value = LOAD_STATUS.LOADING

            return childrenLoader(instance.proxy).then((data: any) => {
              children.value = children.value.concat(data || [])
              loadStatus.value = LOAD_STATUS.LOADED
            }, (err: Error) => {
              loadStatus.value = LOAD_STATUS.DEFAULT
              return Promise.reject(err)
            })
          }
        }

        // 已加载
        return children.value.length > 0 ? Promise.resolve() : Promise.reject('children is empty.')
      },
      expandAfter: () => {
        dispatch("node-expand", { instance })
      }
    })

    watch(() => props.node, (node) => {
      children.value = getNodeChildren(node)
    })

    watchEffect(() => {
      // 防止因为节点数量变化导致 null 的出现
      if (children.value.length !== childrenRefs.value.length) {
        childrenRefs.value.splice(children.value.length)
      }
    })

    function getNodeData () {
      return {
        [getValueKey()]: value.value,
        [getLabelKey()]: label.value,
        [getExpandKey()]: expand.value,
        isLeaf: isLeaf.value,
        [getChildrenKey()]: childrenRefs.value.map((item: any) => item.getNodeData())
      }
    }

    expose({
      childrenRefs,
      value,
      label,
      expand,
      isLeaf,
      getNodeData
    })

    return {
      dispatch,
      childrenRefs,
      selectedNodeValue,
      label,
      value,
      children,
      loadStatus,
      isLeaf,
      expand,
      expandRender,
      expandFunc
    }
  },
  render () {
    const { node, isLeaf, expand } = this

    const getPrefixIcon = () => {
      const _YuumiIcon = resolveComponent('YuumiIcon') as any
      const { depth } = this

      return h('div', {
        class: ['prefix-icon'],
        style: {
          paddingLeft: `${ node.icon ? depth : depth + 1}em`
        }
      }, [
        h(_YuumiIcon, { icon: node?.icon })
      ])
    }

    const getNodeContentVNode = () => {
      const { dispatch, expandRender, selectedNodeValue, value, label, expandFunc } = this

      return h('div', {
        class: ['node-content', { __selected: selectedNodeValue === value}],
        onClick: (e: Event) => {
          expandFunc.call(this, e)
          dispatch('node-click', { instance: this, node })
        },
        onMouseenter: (e: Event) => {
          dispatch('node-mouseenter', { event: e, node })
        },
        onMouseleave: (e: Event) => {
          dispatch('node-mouseleave', { event: e, node })
        }
      }, [
        this.$slots.default ? this.$slots.default({ node, instance: this }) : [
          getPrefixIcon(),
          h('div', {
            class: 'content__label'
          }, [label])
        ],
        expandRender.call(this)
      ])
    }

    const getNodeChildrenVNodes = () => {
      const { depth, value, children, childrenRefs, expandIcon, expandIconVisible } = this

      return children.map((item, index) => {
        return h(resolveComponent('YuumiNavMenuNode') as any, {
          node: item,
          depth: depth + 1,
          expandIcon,
          expandIconVisible,
          ref: (el: any) => childrenRefs[index] = el,
          key: value
        }, {
          default: this.$slots.default
        })
      })
    }

    return h('div', {
      class: ['menu-node', { '__leaf': isLeaf }]
    }, [
      getNodeContentVNode(),
      isLeaf ? null : h(Transition, {
        name: 'node-children',
        onBeforeEnter: (el: any) => { el.style.height = '0px' },
        onEnter: (el: any) => {
          nextTick(() => {
            el.style.height = `${el.scrollHeight}px`
          })
        },
        onAfterEnter: (el: any) => el.style.height = '',
        onBeforeLeave: (el: any) => el.style.height = `${el.scrollHeight}px`,
        onLeave: (el: any) => {
          nextTick(() => {
            el.style.height = '0px'
          })
        },
        onAfterLeave: (el: any) => el.style.height = ''
      }, {
        default: () => withDirectives(
          h('div', { class: 'child-menu' }, getNodeChildrenVNodes()),
          [[vShow, expand]]
        )
      })
    ])
  }
})
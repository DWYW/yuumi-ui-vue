import { computed, ComputedRef, defineComponent, getCurrentInstance, h, inject, nextTick, Ref, ref, resolveComponent, Transition, VNodeRef, vShow, watch, watchEffect, withDirectives } from 'vue'
import { providerKey, ProviderState } from './provider-helper'
import useChildren, { LOAD_STATUS } from './children-helper'
import useExpand from './expand-helper'
import useCheck from './check-helper'

export default defineComponent({
  name: 'YuumiTreeNode',
  props: {
    node: { type: Object, required: true },
    checkable: { type: Boolean },
    expandIcon: { type: Object },
    expandIconVisible: { type: Boolean }
  },
  emits: ['change'],
  setup (props, { emit, expose }) {
    const instance = getCurrentInstance()!
    const {
      dispatch,
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
      childrenLoader
    } = inject(providerKey) as ProviderState

    const childrenRefs: Ref<VNodeRef[]> = ref([])
    const checkboxRef: Ref<VNodeRef|undefined> = ref()

    const label = computed(() => getNodeLabel(props.node))
    const value = computed(() => getNodeValue(props.node))
    const disabled = computed(() => getNodeDisabled(props.node))
    const children: Ref<any[]> = ref(getNodeChildren(props.node))
    const loadStatus = ref(LOAD_STATUS.DEFAULT)

    const { isLeaf } = useChildren({ children, loadStatus }, childrenLoader)

    const { getInitValue: getCheckedInitValue, onUpdateValue: updateCheckedValue, onChange: checkedValueChange, onChildCheckedChange, updateChildrenChecked } = useCheck({ children, childrenRefs, isLeaf, loadStatus, node: props.node }, getNodeChecked)
    const checked = ref(getCheckedInitValue())
    const indeterminate = computed(() => {
      if (isLeaf.value) return false
      if (childrenRefs.value.some((child: any) => child.indeterminate)) return true
      return !checked.value && childrenRefs.value.some((child: any) => child.checked)
    })

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
            }).then(() => {
              // 如果节点是选中状态，设置children的选中状态
              if (checked.value) {
                updateChildrenChecked(childrenRefs.value, checked.value)
              }
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
      checked.value = getNodeChecked(node)

      // 检测子节点变化是否向上修改checked状态
      nextTick(() => {
        if (!isLeaf.value) {
          const v = childrenRefs.value.every((child: any) => child.checked)
          if (v !== checked.value) {
            checked.value = v
            emit("change", { value: value.value, checked: v})
          }
        }
      })
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
        [getCheckedKey()]: checked.value,
        [getDisabledKey()]: disabled.value,
        [getExpandKey()]: expand.value,
        isLeaf: isLeaf.value,
        [getChildrenKey()]: childrenRefs.value.map((item: any) => item.getNodeData())
      }
    }

    function getCheckedNodes (ignoreChildren?: boolean) {
      const nodes: any[] = []

      if (checked.value) {
        nodes.push({
          [getValueKey()]: value.value,
          [getLabelKey()]: label.value,
          [getCheckedKey()]: checked.value,
          [getDisabledKey()]: disabled.value,
          node: props.node
        })
      }

      if (ignoreChildren && checked.value) {
        return nodes
      }

      return childrenRefs.value.reduce((acc: any, item: any) => {
        return acc.concat(item.getCheckedNodes(ignoreChildren))
      }, nodes)
    }

    expose({
      childrenRefs,
      value,
      label,
      checked,
      disabled,
      expand,
      isLeaf,
      indeterminate,
      getNodeData,
      getCheckedNodes
    })

    return {
      dispatch,
      childrenRefs,
      checkboxRef,
      label,
      value,
      disabled,
      children,
      loadStatus,
      isLeaf,
      checked,
      updateCheckedValue,
      checkedValueChange,
      onChildCheckedChange,
      indeterminate,
      expand,
      expandRender,
      expandFunc
    }
  },
  render () {
    const { node, checkable, isLeaf, expand } = this

    const getNodeContentVNode = () => {
      const { expandRender, label, value, disabled, checked,updateCheckedValue, checkedValueChange, indeterminate, expandFunc, expandIconVisible } = this
      const _YuumiCheckbox = resolveComponent('YuumiCheckbox') as any

      return h('div', {
        class: 'node-content',
        onClick: (e: Event) => {
          if (!expandIconVisible) {
            expandFunc.call(this, e)
          }

          this.dispatch('node-click', { node, instance: this })
        }
      }, [
        expandRender.call(this),
        checkable && h('div', { class: 'checkbox-icon' }, [
          h(_YuumiCheckbox, {
            ref: 'checkboxRef',
            unique: value,
            disabled,
            modelValue: checked,
            indeterminate: indeterminate,
            'onUpdate:modelValue': updateCheckedValue.bind(this),
            'onChange': checkedValueChange.bind(this),
            onClick: (e: Event) => { e.stopPropagation() }
          })
        ]),
        h('div', {
          class: 'content__label'
        }, this.$slots.default ? this.$slots.default({ node, instance: this }) : [label])
      ])
    }

    const getNodeChildrenVNodes = () => {
      const { value, children, childrenRefs, onChildCheckedChange, expandIcon, expandIconVisible } = this

      return children.map((item, index) => {
        return h(resolveComponent('YuumiTreeNode') as any, {
          node: item,
          checkable: checkable,
          expandIcon,
          expandIconVisible,
          ref: (el: any) => childrenRefs[index] = el,
          key: value,
          onChange: onChildCheckedChange.bind(this)
        }, {
          default: this.$slots.default
        })
      })
    }

    return h('div', {
      class: ['tree-node', { '__leaf': isLeaf, '__checkable':  checkable }]
    }, [
      getNodeContentVNode(),
      isLeaf ? null : h(Transition, {
        name: 'node-children',
        onBeforeEnter: (el: any) => { el.style.height = '0px' },
        onEnter: (el: any) => nextTick(() => {
          el.style.height = `${el.scrollHeight}px`
        }),
        onAfterEnter: (el: any) => el.style.height = '',
        onBeforeLeave: (el: any) => el.style.height = `${el.scrollHeight}px`,
        onLeave: (el: any) => nextTick(() => {
          el.style.height = '0px'
        }),
        onAfterLeave: (el: any) => el.style.height = ''
      }, {
        default: () => withDirectives(
          h('div', { class: 'child-tree' }, getNodeChildrenVNodes()),
          [[vShow, expand]]
        )
      })
    ])
  }
})
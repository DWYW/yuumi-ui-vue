import { isDescendantElement, isValidComponentPlacement, isValidPopperType } from '../../../share/validator'
import { defineComponent, Fragment, getCurrentInstance, h, mergeProps, ref, Teleport, Transition, VNode } from 'vue'
import { usePopperHelper } from "./popper-helper"
import { useSlotsHelper } from "./slots-helper"

export default defineComponent({
  name: 'YuumiPopper',
  inheritAttrs: false,
  props: {
    placement: { type: String, validator: isValidComponentPlacement, default: 'bottom' },
    fallbackPlacements: { type: Array, default: () => ['top', 'right', 'left'] },
    space: { type: Number, default: 6 },
    type: { type: String, validator: isValidPopperType, default: 'click' }
  },
  emits: ['before-open', 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'],
  setup (props, { emit, expose }) {
    const instance: any = getCurrentInstance()!
    const { popper, initailizePopper, destroyPopper } = usePopperHelper()
    const { getTriggerNode } = useSlotsHelper()
    const visible = ref(false)

    function onClick (e: MouseEvent) {
      const { popper } = instance.refs

      if (visible.value && !isDescendantElement(e.target as HTMLElement, popper)) {
        hidePopper()
      } else if (!visible.value) {
        const { props } = getTriggerNode() as VNode
        if (props && (props.disabled || props.readonly)) return
        showPopper()
      }
    }

    function onMouseenter () {
      const { props } = instance.slots.trigger!()
      if (props && (props.disabled || props.readonly)) return

      showPopper()
    }

    function onMouseleave () {
      hidePopper()
    }

    function showPopper () {
      emit('before-open')
      visible.value = true
    }

    function hidePopper () {
      visible.value = false
    }

    function transitionEventHalk (eventName: any) {
      return (el: any) => {
        emit(eventName, el)

        switch (eventName) {
          case 'before-enter':
            const { trigger } = instance.refs as any
            // 防止是一个组件
            const reference = trigger.$el || trigger

            initailizePopper(el, reference, {
              placement: props.placement,
              offset: [0, props.space],
              fallbackPlacements: <string[]>(props.fallbackPlacements)
            })
            break
          case 'after-enter':
            if (props.type === 'click') {
              window.addEventListener('click', onClick, false)
            }
            break
          case 'before-leave':
            if (props.type === 'click') {
              window.removeEventListener('click', onClick, false)
            }
            break
          case 'after-leave':
            destroyPopper()
            break
        }
      }
    }

    expose({
      visible,
      popper,
      showPopper,
      hidePopper
    })

    return {
      getTriggerNode,
      visible,
      onClick,
      onMouseenter,
      onMouseleave,
      transitionEventHalk
    }
  },
  render () {
    const renderPopper = () => {
      const { $slots, $attrs, visible } = this
      if (!visible) return

      return h('div', mergeProps({
        class: 'yuumi-popper',
        ref: 'popper'
      }, $attrs), [
        h('div', { class: 'popper__arrow', 'data-popper-arrow': '' }),
        h('div', { class: 'popper__content' }, $slots.default ? $slots.default() : undefined)
      ])
    }

    const { $props, getTriggerNode, transitionEventHalk, onClick, onMouseenter, onMouseleave } = this

    const handler: {[x:string]: any} = {
      'click': { onClick },
      'hover': { onMouseenter, onMouseleave }
    }
    const _triggerProps = mergeProps({
      ref: 'trigger'
    }, handler[$props.type])

    return h(Fragment, null, [
      h(getTriggerNode(), _triggerProps),
      h(Teleport, { to: 'body' }, [
        h(Transition, {
          name: 'yuumi-popper',
          onBeforeEnter: transitionEventHalk('before-enter'),
          onEnter: transitionEventHalk('enter'),
          onAfterEnter: transitionEventHalk('after-enter'),
          onBeforeLeave: transitionEventHalk('before-leave'),
          onLeave: transitionEventHalk('leave'),
          onAfterLeave: transitionEventHalk('after-leave')
        }, {
          default: renderPopper
        })
      ])
    ])
  }
})
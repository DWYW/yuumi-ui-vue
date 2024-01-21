import { Fragment, Teleport, Transition, defineComponent, h, ref, mergeProps } from "vue"
import { useNameSpace } from "../../../share/useApi"
import { isDescendantElement } from "../../../share/validator"
import { popperEmits } from "./emits"
import { PopperProps, popperProps } from "./props"
import { useSlot } from "./useSlot"
import { usePopper } from "./usePopper"

export default defineComponent({
  name: "YuumiPopper",
  inheritAttrs: false,
  props: popperProps,
  emits: popperEmits,
  setup(props: PopperProps, { emit, attrs, expose }) {
    const _refs = {
      trigger: ref(),
      popper: ref()
    }

    const { createTriggerNode, createPopperNode } = useSlot()
    const { popper, initailizePopper, destroyPopper } = usePopper()

    const visible = ref(false)
    function showPopper() {
      emit("before-open")
      visible.value = true
    }
    function hidePopper() {
      visible.value = false
    }

    function updatePopper() {
      if (!popper.value) return
      popper.value.forceUpdate()
    }

    function clickHandler(e: MouseEvent) {
      if (visible.value && !isDescendantElement(e.target as HTMLElement, _refs.popper.value)) {
        hidePopper()
      } else if (!visible.value && !props.disabled) {
        showPopper()
      }
    }

    function mouseenterHandler() {
      if (props.disabled) return
      showPopper()
    }

    function mouseleaveHandler() {
      hidePopper()
    }

    function beforeEnterHandler(el: Element) {
      emit("before-enter", el)

      // 防止是一个组件
      const reference = _refs.trigger.value.$el || _refs.trigger.value
      initailizePopper(el as HTMLElement, reference, {
        placement: props.placement,
        offset: [0, props.space],
        fallbackPlacements: <string[]>props.fallbackPlacements
      })
    }

    function enterHandler(el: Element) {
      emit("enter", el)
    }

    function afterEnterHandler(el: Element) {
      emit("after-enter", el)

      if (props.type === "click") {
        window.addEventListener("click", clickHandler, false)
      }
    }

    function beforeLeaveHandler(el: Element) {
      emit("before-leave", el)

      if (props.type === "click") {
        window.removeEventListener("click", clickHandler, false)
      }
    }

    function leaveHandler(el: Element) {
      emit("leave", el)
    }

    function afterLeaveHandler(el: Element) {
      emit("after-leave", el)
      destroyPopper()
    }

    expose({
      visible,
      popper,
      showPopper,
      hidePopper,
      updatePopper
    })

    const ns = useNameSpace("popper")
    return () => {
      function triggerRender() {
        const triggerHandler: { [x: string]: any } = {
          click: {
            onClick: clickHandler
          },
          hover: {
            onMouseenter: mouseenterHandler,
            onMouseleave: mouseleaveHandler
          }
        }

        return h(
          createTriggerNode(),
          mergeProps(
            {
              ref: _refs.trigger
            },
            triggerHandler[props.type]
          )
        )
      }

      function popperRender() {
        if (!visible.value) return

        return h("div", mergeProps({ class: [ns.n()], ref: _refs.popper }, attrs), [
          h("div", { class: [ns.e("arrow")], "data-popper-arrow": "" }),
          h(
            "div",
            {
              class: [ns.e("content")],
              onClick: (e: Event) => {
                if (props.stop) {
                  e.stopPropagation()
                }
              }
            },
            [createPopperNode()]
          )
        ])
      }

      return h(Fragment, null, [
        triggerRender(),

        h(Teleport, { to: "body" }, [
          h(
            Transition,
            {
              name: "yuumi-popper",
              onBeforeEnter: beforeEnterHandler,
              onEnter: enterHandler,
              onAfterEnter: afterEnterHandler,
              onBeforeLeave: beforeLeaveHandler,
              onLeave: leaveHandler,
              onAfterLeave: afterLeaveHandler
            },
            {
              default: popperRender
            }
          )
        ])
      ])
    }
  }
})

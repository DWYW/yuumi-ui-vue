import { defineComponent, h, nextTick, ref } from "vue"
import { pluginMount, pluginUnmount } from "../instance"
import Message from "./Message.vue"
import type { VNode } from "vue"

export interface CreateMessageOption {
  message: string
  icon?: VNode
  theme?: "default" | "primary" | "warn" | "danger" | "success"
  duration?: number
  offset?: number
}

export interface YuumiMessage {
  createMessage: (option: CreateMessageOption) => VNode
  removeMessage: (vnode: VNode) => void
  removeAllMessage: () => void
}

const messages = new Map()

export function createMessage(option: CreateMessageOption) {
  const { icon, message, ..._option } = Object.assign({ offset: 10 }, option)

  const _component = defineComponent({
    setup() {
      const messageEl = ref()
      const top = ref(_option.offset)

      const lastKey = Array.from(messages.keys()).pop()
      if (lastKey) {
        const { props, refs } = messages.get(lastKey)
        top.value += props.top + refs.el.value.getBoundingClientRect().height
      }

      return () =>
        h(
          Message,
          Object.assign({}, _option, {
            top: top.value,
            onBeforeEnter: () => {
              nextTick(() => {
                messages.set(
                  vnode,
                  Object.assign(
                    {
                      updateTop: (v: number) => (top.value = v)
                    },
                    messageEl.value
                  )
                )

                updateMessageTop()
              })
            },
            onBeforeLeave: () => {
              messages.delete(vnode)
              updateMessageTop()
            },
            onAfterLeave: () => {
              pluginUnmount(vnode)
            },
            ref: (el: any) => (messageEl.value = el)
          }),
          {
            icon: () => icon,
            default: () => message
          }
        )
    }
  })
  const vnode = h(_component)
  pluginMount(vnode, Message.name)
  return vnode
}

export function removeMessage(node: VNode) {
  const target = messages.get(node)
  if (!target) return
  target.hide()
}

export function removeAllMessage() {
  nextTick(() => messages.forEach(item => item.hide()))
}

function updateMessageTop() {
  let top = 0

  messages.forEach(item => {
    const { props, refs, isVisible } = item
    if (!isVisible) return

    const rect = refs.el.value.getBoundingClientRect()
    if (!rect) return

    top += props.offset
    item.updateTop(top)
    top += rect.height
  })
}

import { defineComponent, h, nextTick, ref } from "vue"
import { pluginMount, pluginUnmount } from "../instance"
import Notification from "./Notification.vue"
import type { VNode } from "vue"

export interface CreateNotificationOption {
  title: string | VNode
  message: string | VNode
  direction: "bl" | "br" | "tl" | "tr"
  icon?: VNode
  theme?: "default" | "primary" | "warn" | "danger" | "success"
  duration?: number
  offset?: number
}

export interface YuumiNotification {
  createNotification: (option: CreateNotificationOption) => VNode
  removeNotification: (vnode: VNode) => void
  removeAllNotification: () => void
}

const notifications = new Map()

export function createNotification(option: CreateNotificationOption) {
  const { title, message, icon, ..._option } = Object.assign({ offset: 10 }, option)

  const _component = defineComponent({
    setup() {
      const notificationEl = ref()
      const position = ref(_option.offset)

      const lastKey = Array.from(notifications.keys()).pop()
      if (lastKey) {
        const { props, refs } = notifications.get(lastKey)
        position.value += props.position + refs.el.value.getBoundingClientRect().height
      }

      return () =>
        h(
          Notification,
          Object.assign({}, _option, {
            position: position.value,
            onBeforeEnter: () => {
              nextTick(() => {
                notifications.set(
                  vnode,
                  Object.assign(
                    {
                      updatePosition: (v: number) => (position.value = v)
                    },
                    notificationEl.value
                  )
                )

                updateNotificationTop(notificationEl.value.props.direction)
              })
            },
            onBeforeLeave: () => {
              const { direction } = notifications.get(vnode).props
              notifications.delete(vnode)
              updateNotificationTop(direction)
            },
            onAfterLeave: () => {
              pluginUnmount(vnode)
            },
            ref: (el: any) => (notificationEl.value = el)
          }),
          {
            title: () => title,
            icon: () => icon,
            default: () => message
          }
        )
    }
  })
  const vnode = h(_component)
  pluginMount(vnode, Notification.name)
  return vnode
}

export function removeNotification(node: VNode) {
  const target = notifications.get(node)
  if (!target) return
  target.hide()
}

export function removeAllNotification() {
  nextTick(() => notifications.forEach(item => item.hide()))
}

function updateNotificationTop(direction: string) {
  let position = 0

  notifications.forEach(item => {
    const { props, refs, isVisible } = item
    if (!isVisible || props.direction !== direction) return

    const rect = refs.el.value.getBoundingClientRect()
    if (!rect) return

    position += props.offset
    item.updatePosition(position)
    position += rect.height
  })
}

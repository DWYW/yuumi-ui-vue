import { defineComponent, h, nextTick } from "vue"
import { pluginMount, pluginUnmount } from "../instance"
import Alert from "./Alert.vue"
import type { VNode } from "vue"

export interface CreateAlertOption {
  title?: string | VNode
  content?: string | VNode
  alignCenter?: boolean
  closeEnable?: boolean
  cancelText?: string
  cancelEnable?: boolean
  confirmText?: string
  confirmEnable?: boolean
  stopPenetrate?: boolean
  onClose?: (...rest: any[]) => any
  onCancel?: (...rest: any[]) => any
  onConfirm?: (...rest: any[]) => any
}

export interface YuumiAlert {
  createAlert: (option?: CreateAlertOption) => VNode
  removeAlert: (vnode: VNode) => void
  removeAllAlert: () => void
}

const alerts = new Map()

export function createAlert(option?: CreateAlertOption) {
  const _component = defineComponent({
    setup() {
      return () =>
        h(
          Alert,
          Object.assign({}, option, {
            onAfterLeave: () => pluginUnmount(vnode),
            ref: (e: any) => {
              e ? alerts.set(vnode, e) : alerts.delete(vnode)
            }
          })
        )
    }
  })
  const vnode = h(_component)
  pluginMount(vnode, Alert.name!)
  return vnode
}

export function removeAlert(node: VNode) {
  const target = alerts.get(node)
  if (!target) return
  target.hide()
}

export function removeAllAlert() {
  nextTick(() => alerts.forEach(item => item.hide()))
}
